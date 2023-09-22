const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { getNextDeadlineTasks, metricCounterTasksInMonth, balanceTasksInMonth, balanceTasksCurrentMonth, balanceTasksLastMonth, metricCounterTasksCurrentMonth, metricCounterTasksLastMonth, GetAllMonthsBalance } = require('../controllers/taskController.js');



router.get('/tasks/deadline', authMiddleware, getNextDeadlineTasks);

router.get('/tasks/balance/all', authMiddleware, GetAllMonthsBalance);

router.get('/tasks/balance/:year/:month', authMiddleware, balanceTasksInMonth);
router.get('/tasks/balance/current', authMiddleware, balanceTasksCurrentMonth);
router.get('/tasks/balance/last', authMiddleware, balanceTasksLastMonth);

router.get('/tasks/metric/:year/:month', authMiddleware, metricCounterTasksInMonth);
router.get('/tasks/metric/current', authMiddleware, metricCounterTasksCurrentMonth);
router.get('/tasks/metric/last', authMiddleware, metricCounterTasksLastMonth);


module.exports = router;

// TODO criar uma função parametrica que pegue determinadas duas datas e verifique as metrias dentro desse range
