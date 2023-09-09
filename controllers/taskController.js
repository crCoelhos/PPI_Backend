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

module.exports = {
    createTask,
    getTaskById,
    getAllTasks,
    updateTask,
    deleteTask,
};
