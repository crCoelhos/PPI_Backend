const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createTask, updateTask, deleteTask, getTaskById, getAllTasks, getNextDeadlineTasks, metricCounterTasksInMonth } = require('../controllers/taskController.js');

router.post('/task', authMiddleware, createTask);
router.get('/task/:id', getTaskById);
router.get('/tasks/', getAllTasks);
router.get('/tasks/deadline', authMiddleware, getNextDeadlineTasks);
router.get('/tasks/metric/:year/:month', authMiddleware, metricCounterTasksInMonth);
router.put('/task/:id', authMiddleware, updateTask);
router.delete('/task/:id', authMiddleware, deleteTask);


module.exports = router;
