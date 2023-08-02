const bcrypt = require('bcrypt');
const { Customer } = require('../models');

async function createCustomer(req, res) {
  try {
    const { customer } = req.body;

    const newCustomer = await Customer.create(customer);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getAllCustomers(req, res) {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getCustomerById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({ message: 'You did not provide the id parameter' });
      return;
    }

    const customer = await Customer.findByPk(id);
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateCustomerById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({ message: 'You did not provide the id parameter' });
      return;
    }

    const customerUpdate = await Customer.findByPk(id);
    if (!customerUpdate) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }

    const updatedCustomer = req.body;

    await customerUpdate.update(updatedCustomer);
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteCustomerById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({ message: 'You did not provide the id parameter' });
      return;
    }

    const customer = await Customer.findByPk(id);
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }

    await customer.destroy();
    res.status(204).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
