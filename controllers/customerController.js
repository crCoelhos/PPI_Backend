'use strict';
const { Customer } = require('../models');

async function createCustomer(req, res) {
    try {
        const customerData = req.body;
        const newCustomer = await Customer.create(customerData);
        res.status(201).json({ customer: newCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o cliente' });
    }
}

async function getCustomerById(req, res) {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'cliente não encontrado' });
        }
        res.json({ customer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter o cliente' });
    }
}

async function getAllCustomers(req, res) {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os clientes' });
    }
}

async function updateCustomerById(req, res) {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'cliente não encontrado' });
        }
        const customerData = req.body;
        await Customer.update(customerData, { where: { id: customerId } });
        const updatedCustomer = await Customer.findByPk(customerId);
        res.json(updatedCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o cliente' });
    }
}

async function deleteCustomerById(req, res) {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'cliente não encontrado' });
        }
        await customer.destroy();
        res.json({ message: 'cliente excluído com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o cliente' });
    }
}

module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomerById,
    deleteCustomerById,
};
