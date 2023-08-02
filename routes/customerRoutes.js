const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const customerController = require('../controllers/customerController.js');

router.post('/customer/', authMiddleware, customerController.createCustomer);
router.get('/customer/', authMiddleware, customerController.getAllCustomers);
router.get('/customer/:id', authMiddleware, customerController.getCustomerById);
router.put('/customer/:id', authMiddleware, customerController.updateCustomerById);
router.delete('/customer/:id', authMiddleware, customerController.deleteCustomerById);

module.exports = router;
