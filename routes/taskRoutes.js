const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createTask, updateTask, deleteTask, getTaskById, getAllTasks } = require('../controllers/taskController.js');

router.post('/task', authMiddleware, createTask);
router.get('/task/:id', getTaskById);
router.get('/tasks', getAllTasks);
router.put('/task/:id', authMiddleware, updateTask);
router.delete('/task/:id', authMiddleware, deleteTask);


module.exports = router;
