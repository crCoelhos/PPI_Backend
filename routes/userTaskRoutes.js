const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createUserTask, updateUserTask, getAllUserTasks } = require('../controllers/user_taskController.js');

router.post('/UserTask', authMiddleware, createUserTask);
router.get('/UserTask', authMiddleware, getAllUserTasks);
router.put('/UserTask/:id', authMiddleware, updateUserTask);


module.exports = router;