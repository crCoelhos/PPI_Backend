const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const taskController = require('../controllers/taskController.js');


router.post('/task', authMiddleware, taskController.createTask);
router.get('/task/:id', taskController.getTaskById);
router.get('/tasks/', taskController.getAllTasks);
router.put('/task/:id', authMiddleware, taskController.updateTask);
router.delete('/task/:id', authMiddleware, taskController.deleteTask);

router.get('/tasks/deadline', authMiddleware, taskController.getNextDeadlineTasks);

router.get('/tasks/metric/:year/:month', authMiddleware, taskController.metricCounterTasksInMonth);



// router.get('/tasks/balance/canceled/current', authMiddleware, calculateTotalEstimateValueOfCompletedTasks);
// router.get('/tasks/balance/canceled/last', authMiddleware, calculateTotalEstimateValueOfLastMonthCompletedTasks);


module.exports = router;

// TODO: separar as rotas de task e metrics pra facilitar a gerencia
// TODO criar uma função parametrica que pegue determinadas duas datas e verifique as metrias dentro desse range
