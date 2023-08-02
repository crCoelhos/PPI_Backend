const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const {uploadUserPhoto, uploadEventPhoto, uploadAthleticPhoto} = require('../controllers/uploadController.js')

router.post('/photouser', authMiddleware, uploadUserPhoto)
router.post('/photoevent/:id', authMiddleware, uploadEventPhoto)
router.post('/photoathletic/:id', authMiddleware, uploadAthleticPhoto)
router.post('/login', login); 
router.post('/signup', signup);

module.exports = router;
