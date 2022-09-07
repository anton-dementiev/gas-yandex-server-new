const employeeRoutes = require('./employee.routes');
const clientRoutes = require('./client.routes');
const projectRoutes = require('./project.routes');
const paymentRoutes = require('./payment.routes');
const currencyRoutes = require('./currency.routes');

const express = require('express');
const router = express.Router();


router.use(employeeRoutes);
router.use(clientRoutes);
router.use(projectRoutes);
router.use(paymentRoutes);
router.use(currencyRoutes);



module.exports = router;