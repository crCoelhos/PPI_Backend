const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const expertiseController = require('../controllers/expertiseController.js');

router.post('/expertise/', authMiddleware, expertiseController.createExpertise);
router.get('/expertises/', authMiddleware, expertiseController.getAllExpertises);
router.get('/expertise/:id', authMiddleware, expertiseController.getExpertiseById);
router.put('/expertise/:id', authMiddleware, expertiseController.updateExpertise);
router.delete('/expertise/:id', authMiddleware, expertiseController.deleteExpertise);

module.exports = router;