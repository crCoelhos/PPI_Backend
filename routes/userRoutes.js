const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const userController = require('../controllers/userController.js');

router.post('/user/', authMiddleware, userController.createUser);
router.get('/users/', authMiddleware, userController.getAllUsers);
router.get('/user/self/', authMiddleware, userController.getUserData);
router.get('/user/:id', authMiddleware, userController.getUserById);
router.put('/user/:id', authMiddleware, userController.updateUserById);
router.delete('/user/:id', authMiddleware, userController.deleteUserById);


router.post('/user/request-password', userController.requestPasswordReset);
router.post('/user/confirm-new-password', userController.confirmPasswordReset);

module.exports = router;
