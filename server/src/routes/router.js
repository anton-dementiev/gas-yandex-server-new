const employeeRoutes = require('./employee.routes');
const clientRoutes = require('./client.routes');
const projectRoutes = require('./project.routes');
const paymentRoutes = require('./payment.routes');

const express = require('express');
const router = express.Router();


router.use(employeeRoutes);
router.use(clientRoutes);
router.use(projectRoutes);
router.use(paymentRoutes);



module.exports = router;