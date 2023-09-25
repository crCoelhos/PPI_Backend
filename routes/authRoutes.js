const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const uploadController = require('../controllers/uploadController')




router.post('/photouser', authMiddleware, uploadController.uploadUserPhoto)
router.post('/customercontract/:id', authMiddleware, uploadController.uploadCustomerContract)
router.post('/login', login); 
// router.post('/signup', signup);

module.exports = router;
