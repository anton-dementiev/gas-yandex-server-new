const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice.controller');



//Get all Invoices
router.get("/invoices", invoiceController.getAllInvoices);

//Get invoices as a view 
router.get("/invoices_view", invoiceController.getAllInvoicesView);

//Create New Invoice
router.post("/invoices", invoiceController.createInvoice);

//Update Invoice By Id
router.put("/invoices/:id", invoiceController.updateInvoice);

//Get Invoice By Id 
router.get("/invoices/:id", invoiceController.getInvoiceById);

//Delete Invoice By Id
router.delete("/invoices/:id", invoiceController.deleteInvoiceById);


module.exports = router;