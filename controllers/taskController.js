'use strict';
const { Task, User_Task } = require('../models');
const { Op } = require('sequelize');



async function updateOverdueTasks() {
    const currentDate = new Date();

    const overdueTasks = await Task.findAll({
        where: {
            taskStatus: {
                [Op.notIn]: ['PAUSED', 'CANCELED', 'COMPLETED'],
            },
            deadline: {
                [Op.lt]: currentDate,
            },
        },
    });

    for (const task of overdueTasks) {
        await task.update({ taskStatus: 'OVERDUE' });
    }
}

async function createTask(req, res) {
    try {
        const taskData = req.body;
        const newTask = await Task.create(taskData);
        res.status(201).json({ task: newTask });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            const errorMessages = error.errors.map(err => err.message);
            res.status(400).json({ errors: errorMessages });
        } else {
            res.status(500).json({ error: 'Erro ao criar a tarefa' });
        }
    }
}

async function getTaskById(req, res) {


    try {


        const taskId = req.params.id;
        const task = await Task.findByPk(taskId, {
            include: [
                {
                    model: User_Task,
                    as: 'usertask',
                },
            ],
        });

        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter a tarefa' });
    }
}


async function getAllTasks(req, res) {
    try {
        await updateOverdueTasks();


        const tasks = await Task.findAll({
            include: [
                {
                    model: User_Task,
                    as: 'usertask',
                },
            ],
        });

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter as tarefas' });
    }
}


async function updateTask(req, res) {
    try {
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        const taskData = req.body;
        await Task.update(taskData, { where: { id: taskId } });
        const updatedTask = await Task.findByPk(taskId);
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
    }
}

async function deleteTask(req, res) {
    try {
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        await task.destroy();
        res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir a tarefa' });
    }
}

async function getNextDeadlineTasks(req, res) {
    try {
        const currentDate = new Date();

        const nextDeadlineTasks = await Task.findAll({
            where: {
                taskStatus: {
                    [Op.notIn]: ['PAUSED', 'CANCELED', 'COMPLETED'],
                },
                deadline: {
                    [Op.gt]: currentDate,
                },
            },
            order: [
                ['deadline', 'ASC'] // Ordena em ordem crescente de prazo final
            ],
        });

        if (nextDeadlineTasks.length === 0) {
            return res.status(404).json({ error: 'Nenhuma tarefa com prazo futuro encontrada' });
        }

        res.json(nextDeadlineTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao encontrar as tarefas com prazo final mais próximo' });
    }
}
async function countCompletedTasksLastMonth(req, res) {
    try {

        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);

        const completedTasksCount = await Task.count({
            where: {
                taskStatus: 'COMPLETED',
                updatedAt: {
                    [Op.between]: [oneMonthAgo, currentDate],
                },
            },
        });

        res.json({ completedTasksCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao contar as tarefas completadas no último mês' });
    }
}

async function metricCounterTasksInMonth(req, res) {
    try {
        const { year, month } = req.params;

        if (!year || !month) {
            return res.status(400).json({ error: 'Ano e mês são obrigatórios' });
        }

        if (isNaN(year) || isNaN(month) || year < 0 || month < 1 || month > 12) {
            return res.status(400).json({ error: 'Ano e mês devem ser valores numéricos válidos' });
        }

        const startDate = new Date(year, month - 1, 1); // primeiro dia do mês
        const endDate = new Date(year, month, 0); // ultimo dia do mês

        const completedTasksCount = await Task.count({
            where: {
                taskStatus: 'COMPLETED',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const canceledTasksCount = await Task.count({
            where: {
                taskStatus: 'CANCELED',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const pausedTasksCount = await Task.count({
            where: {
                taskStatus: 'PAUSED',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const doingTasksCount = await Task.count({
            where: {
                taskStatus: ['TO_ESTIMATE', 'INPROGRESS'],
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const overdueTasksCount = await Task.count({
            where: {
                taskStatus: 'OVERDUE',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        res.json({ completedTasksCount, canceledTasksCount, pausedTasksCount, doingTasksCount, overdueTasksCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao contar as tarefas completadas no mês especificado' });
    }
}

module.exports = {
    createTask,
    getTaskById,
    getAllTasks,
    updateTask,
    deleteTask,
    getNextDeadlineTasks,
    metricCounterTasksInMonth
};
