const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { assignTask, updateUserTask, getAllUserTasks ,listUsersWithAssignmentCounts} = require('../controllers/user_taskController.js');

router.post('/UserTask', authMiddleware, assignTask);
router.get('/UserTask', authMiddleware, getAllUserTasks);
router.get('/UserTask', authMiddleware, getAllUserTasks);
// router.get('/listUserTask', authMiddleware, listUsersWithAssignmentCounts);
router.put('/UserTask/:id', authMiddleware, updateUserTask);


module.exports = router;