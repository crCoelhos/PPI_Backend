'use strict';
const { Expertise } = require('../models');

async function createExpertise(req, res) {
    try {
        const expertiseData = req.body;
        const newExpertise = await Expertise.create(expertiseData);
        res.status(201).json({ task: newExpertise });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            const errorMessages = error.errors.map(err => err.message);
            res.status(400).json({ errors: errorMessages });
        } else {
            res.status(500).json({ error: 'Erro ao criar expertise' });
        }
    }
}

async function getExpertiseById(req, res) {
    try {
        const expertiseId = req.params.id;
        const expertise = await Expertise.findByPk(expertiseId);
        if (!expertise) {
            return res.status(404).json({ error: 'Expertise não encontrada' });
        }
        res.json({ expertise });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter a expertise' });
    }
}

async function getAllExpertises(req, res) {
    try {
        const expertises = await Expertise.findAll();
        res.json(expertises);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter as expertises' });
    }
}

async function updateExpertise(req, res) {
    try {
        const expertiseId = req.params.id;
        const expertise = await Expertise.findByPk(expertiseId);
        if (!expertise) {
            return res.status(404).json({ error: 'Expertise não encontrada' });
        }
        const expertiseData = req.body;
        await Expertise.update(expertiseData, { where: { id: expertiseId } });
        const updatedExpertise = await Expertise.findByPk(expertiseId);
        res.json(updatedExpertise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar a expertise' });
    }
}

async function deleteExpertise(req, res) {
    try {
        const expertiseId = req.params.id;
        const expertise = await Expertise.findByPk(expertiseId);
        if (!expertise) {
            return res.status(404).json({ error: 'Expertise não encontrada' });
        }
        await expertise.destroy();
        res.json({ message: 'Expertise excluída com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir a expertise' });
    }
}

module.exports = {
    createExpertise,
    getExpertiseById,
    getAllExpertises,
    updateExpertise,
    deleteExpertise,
};
