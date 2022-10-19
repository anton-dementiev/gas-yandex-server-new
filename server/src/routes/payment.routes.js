const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');



//Get all Payments
router.get("/payments", paymentController.getAllPayments);

//Get All Payments as a View
router.get("/payments_view", paymentController.getAllPaymentsView);

//Create New payment
router.post("/payments", paymentController.createPayment);

//Update payment By Id
router.put("/payments/:id", paymentController.updatePayment);

//Get payment By Id 
router.get("/payments/:id", paymentController.getPaymentById);

//Delete payment By Id
router.delete("/payments/:id", paymentController.deletePaymentById);


module.exports = router;