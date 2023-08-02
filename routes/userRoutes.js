const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');


// Define as rotas para as operações CRUD de usuarios(Com exceção do userroles)
router.get('/user/', authMiddleware, userController.getAllUsers);
router.get('/user/:id', authMiddleware, userController.getUserById);
router.post('/user/', authMiddleware, userController.createUser);
router.put('/user/:id', authMiddleware, userController.updateUserById);
router.delete('/user/:id', authMiddleware, userController.deleteUserById);

module.exports = router;