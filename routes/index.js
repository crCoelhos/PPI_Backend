const express = require('express');
const router = express.Router();

const accessMiddleware = require('../middleware/acessMiddleware.js');

const authRoute = require('./authRoutes');
const userRoute = require('./userRoutes');
const roleRoute = require('./roleRoutes');
const userTaskRoutes = require('./userTaskRoutes.js')
const taskRoutes = require('./taskRoutes.js')
const metricRoutes = require('./metricRoutes.js')
const customerRoutes = require('./customerRoutes.js')
const expertiseRoutes = require('./expertiseRoutes.js')

router.use('/auth', authRoute, accessMiddleware);
router.use('/admin', userRoute, accessMiddleware);
router.use('/admin', roleRoute, accessMiddleware);
router.use('/admin', userTaskRoutes, accessMiddleware);
router.use('/admin', taskRoutes, accessMiddleware);
router.use('/admin', customerRoutes, accessMiddleware);
router.use('/admin', expertiseRoutes, accessMiddleware);
router.use('/admin', metricRoutes, accessMiddleware);
// router.post('/webhook', Webhook);

module.exports = router;