const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createTask, updateTask, deleteTask, getTaskById, getAllTasks, getNextDeadlineTasks, metricCounterTasksInMonth, countCompletedTasksLastMonth, countCompletedTasksCurrentMonth, calculateTotalEstimateValueOfCompletedTasks, calculateTotalEstimateValueOfLastMonthCompletedTasks } = require('../controllers/taskController.js');

router.post('/task', authMiddleware, createTask);
router.get('/task/:id', getTaskById);
router.get('/tasks/', getAllTasks);
router.put('/task/:id', authMiddleware, updateTask);
router.delete('/task/:id', authMiddleware, deleteTask);

router.get('/tasks/deadline', authMiddleware, getNextDeadlineTasks);

router.get('/tasks/metric/:year/:month', authMiddleware, metricCounterTasksInMonth);
router.get('/tasks/metric/last', authMiddleware, countCompletedTasksLastMonth);
router.get('/tasks/metric/current', authMiddleware, countCompletedTasksCurrentMonth);

router.get('/tasks/balance/completed/current', authMiddleware, calculateTotalEstimateValueOfCompletedTasks);
router.get('/tasks/balance/completed/last', authMiddleware, calculateTotalEstimateValueOfLastMonthCompletedTasks);

// router.get('/tasks/balance/canceled/current', authMiddleware, calculateTotalEstimateValueOfCompletedTasks);
// router.get('/tasks/balance/canceled/last', authMiddleware, calculateTotalEstimateValueOfLastMonthCompletedTasks);


module.exports = router;
