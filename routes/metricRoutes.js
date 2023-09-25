const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const metricController = require('../controllers/taskController')



router.get('/tasks/deadline', authMiddleware, metricController.getNextDeadlineTasks);

router.get('/tasks/balance/all', authMiddleware, metricController.GetAllMonthsBalance);

router.get('/tasks/balance/:year/:month', authMiddleware, metricController.balanceTasksInMonth);
router.get('/tasks/balance/current', authMiddleware, metricController.balanceTasksCurrentMonth);
router.get('/tasks/balance/last', authMiddleware, metricController.balanceTasksLastMonth);

router.get('/tasks/metric/:year/:month', authMiddleware, metricController.metricCounterTasksInMonth);
router.get('/tasks/metric/current', authMiddleware, metricController.metricCounterTasksCurrentMonth);
router.get('/tasks/metric/last', authMiddleware, metricController.metricCounterTasksLastMonth);


module.exports = router;

// TODO criar uma função parametrica que pegue determinadas duas datas e verifique as metrias dentro desse range
