'use strict';
const { Task, User_Task } = require('../models');
const { Op, literal } = require('sequelize');
const { startOfMonth, endOfMonth, subMonths } = require('date-fns');




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

        if (taskData.taskStatus === 'COMPLETED' && task.taskStatus !== 'COMPLETED') {
            taskData.completedAt = new Date();
        }

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
                ['deadline', 'ASC']
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




async function balanceTasksCurrentMonth(req, res) {
    try {


        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        endDate.setMonth(currentDate.getMonth());


        const completedTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'COMPLETED',
                completedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const canceledTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'CANCELED',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const pausedTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'PAUSED',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const doingTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: ['TO_ESTIMATE', 'INPROGRESS'],
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const overdueTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'OVERDUE',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });


        res.json({ completedTasksBalance, canceledTasksBalance, pausedTasksBalance, doingTasksBalance, overdueTasksBalance, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao calcular balanço das tarefas completadas no último mês' });
    }
}

async function balanceTasksLastMonth(req, res) {
    try {
        const currentDate = new Date();

        const lastMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
        const startDate = new Date(currentDate.getFullYear(), lastMonth, 1);
        const endDate = new Date(currentDate.getFullYear(), lastMonth + 1, 0);

        const completedTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'COMPLETED',
                completedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const canceledTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'CANCELED',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const pausedTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'PAUSED',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const doingTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: ['TO_ESTIMATE', 'INPROGRESS'],
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const overdueTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'OVERDUE',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        res.json({
            completedTasksBalance,
            canceledTasksBalance,
            pausedTasksBalance,
            doingTasksBalance,
            overdueTasksBalance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Erro ao calcular balanço das tarefas completadas no mês anterior',
        });
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
                completedAt: {
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


        res.json({ completedTasksCount, canceledTasksCount, pausedTasksCount, doingTasksCount, overdueTasksCount, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao contar as tarefas completadas no mês especificado' });
    }
}

async function balanceTasksInMonth(req, res) {
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

        const completedTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'COMPLETED',
                completedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const canceledTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'CANCELED',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const pausedTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'PAUSED',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const doingTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: ['TO_ESTIMATE', 'INPROGRESS'],
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const overdueTasksBalance = await Task.sum('estimateValue', {
            where: {
                taskStatus: 'OVERDUE',
                updatedAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });


        res.json({ completedTasksBalance, canceledTasksBalance, pausedTasksBalance, doingTasksBalance, overdueTasksBalance, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao contar as tarefas completadas no mês especificado' });
    }
}

async function metricCounterTasksCurrentMonth(req, res) {
    try {

        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        endDate.setMonth(currentDate.getMonth());


        const completedTasksCount = await Task.count({
            where: {
                taskStatus: 'COMPLETED',
                completedAt: {
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


        res.json({ completedTasksCount, canceledTasksCount, pausedTasksCount, doingTasksCount, overdueTasksCount, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao contar as tarefas completadas no mês especificado' });
    }
}


async function metricCounterTasksLastMonth(req, res) {
    try {

        const currentDate = new Date();

        const lastMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
        const startDate = new Date(currentDate.getFullYear(), lastMonth, 1);
        const endDate = new Date(currentDate.getFullYear(), lastMonth + 1, 0);


        const completedTasksCount = await Task.count({
            where: {
                taskStatus: 'COMPLETED',
                completedAt: {
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


        res.json({ completedTasksCount, canceledTasksCount, pausedTasksCount, doingTasksCount, overdueTasksCount, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao contar as tarefas completadas no mês especificado' });
    }
}



async function GetAllMonthsBalance(req, res) {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const balanceArray = [];

        for (let month = 1; month <= 12; month++) {
            const startDate = new Date(currentYear, month - 1, 1);
            const endDate = new Date(currentYear, month, 0);

            const balance = await Task.sum('estimateValue', {
                where: {
                    taskStatus: 'COMPLETED',
                    completedAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            });

            balanceArray.push({
                year: currentYear,
                month,
                balance,
            });
        }

        res.json(balanceArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os saldos de todos os meses' });
    }
};




module.exports = {
    createTask,
    getTaskById,
    getAllTasks,
    updateTask,
    deleteTask,


    getNextDeadlineTasks,

    balanceTasksInMonth,
    balanceTasksCurrentMonth,
    balanceTasksLastMonth,

    metricCounterTasksInMonth,
    metricCounterTasksCurrentMonth,
    metricCounterTasksLastMonth,

    GetAllMonthsBalance

};
