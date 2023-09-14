'use strict';
const { User_Task } = require('../models');

async function assignTask(req, res) {
    try {
        const userTaskData = req.body;
        const newUserTask = await User_Task.create(userTaskData);
        res.status(201).json({ userTask: newUserTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a atribuição de usuário para tarefa' });
    }
}

async function getUserTaskById(req, res) {
    try {
        const userTaskId = req.params.id;
        const userTask = await User_Task.findByPk(userTaskId);
        if (!userTask) {
            return res.status(404).json({ error: 'Atribuição de usuário para tarefa não encontrada' });
        }
        res.json({ userTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter a atribuição de usuário para tarefa' });
    }
}

async function getAllUserTasks(req, res) {
    try {
        const userTasks = await User_Task.findAll();
        res.json(userTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter as atribuições de usuário para tarefas' });
    }
}

async function updateUserTask(req, res) {
    try {
        const userTaskId = req.params.id;
        const userTask = await User_Task.findByPk(userTaskId);
        if (!userTask) {
            return res.status(404).json({ error: 'Atribuição de usuário para tarefa não encontrada' });
        }
        const userTaskData = req.body;
        await User_Task.update(userTaskData, { where: { id: userTaskId } });
        const updatedUserTask = await User_Task.findByPk(userTaskId);
        res.json(updatedUserTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar a atribuição de usuário para tarefa' });
    }
}

async function deleteUserTask(req, res) {
    try {
        const userTaskId = req.params.id;
        const userTask = await User_Task.findByPk(userTaskId);
        if (!userTask) {
            return res.status(404).json({ error: 'Atribuição de usuário para tarefa não encontrada' });
        }
        await userTask.destroy();
        res.json({ message: 'Atribuição de usuário para tarefa excluída com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir a atribuição de usuário para tarefa' });
    }
}

async function countUserTasks(userId) {
    try {
        const userTasksCount = await User_Task.count({
            where: {
                userId: userId,
            },
        });

        return userTasksCount;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao contar as atribuições de usuário para tarefas');
    }
}

module.exports = {
    assignTask,
    getUserTaskById,
    getAllUserTasks,
    updateUserTask,
    deleteUserTask,
    countUserTasks
};
