const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createtask, updatetask, deletetask, gettaskById, getAlltask, getUserAthleticBytask } = require('../controllers/taskController.js');

router.post('/task', authMiddleware, createtask);
router.get('/task/:id', gettaskById);
router.get('/tasks', getAlltask);
router.put('/task/:id', authMiddleware, updatetask);
router.delete('/task/:id', authMiddleware, deletetask);


module.exports = router;
