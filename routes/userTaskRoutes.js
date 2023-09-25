const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const user_taskController = require('../controllers/user_taskController.js');

router.post('/UserTask', authMiddleware, user_taskController.assignTask);
router.get('/UserTask', authMiddleware, user_taskController.getAllUserTasks);
router.get('/UserTask', authMiddleware, user_taskController.getAllUserTasks);
// router.get('/listUserTask', authMiddleware, listUsersWithAssignmentCounts);
router.put('/UserTask/:id', authMiddleware, user_taskController.updateUserTask);


module.exports = router;