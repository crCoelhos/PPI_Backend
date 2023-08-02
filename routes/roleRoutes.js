const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const roleController = require('../controllers/roleController.js');

router.get('/role/', authMiddleware, roleController.getAllRoles);


module.exports = router;
