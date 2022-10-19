const employeeRoutes = require('./employee.routes');
const clientRoutes = require('./client.routes');
const projectRoutes = require('./project.routes');
const paymentRoutes = require('./payment.routes');
const contractRoutes = require('./contract.routes');
const currencyRoutes = require('./currency.routes');
const expenseRoutes = require('./expense.routes');
const invoiceRoutes = require('./invoice.routes');

const helperRoutes = require('./helper.routes');

const express = require('express');
const router = express.Router();


router.use(employeeRoutes);
router.use(clientRoutes);
router.use(projectRoutes);
router.use(contractRoutes);
router.use(paymentRoutes);
router.use(currencyRoutes);
router.use(expenseRoutes);
router.use(invoiceRoutes);

router.use(helperRoutes);



module.exports = router;