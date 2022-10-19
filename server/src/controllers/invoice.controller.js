const Invoice = require ('../models/invoice.model');

const createInvoice = (req, res) => {
    
    const newInvoice = Invoice.newInvoice(req.body);

    Invoice.createInvoice(newInvoice, (err, invoice)=>{
         if (err) {
             res.send(err);
         }

         res.json({error:false, message: "Success", data: invoice})
    });
}


const updateInvoice = (req, res) => {
    const invoiceId = req.params.id;
    const invoice = req.body;
    Invoice.updateInvoice(invoiceId, invoice, (err, result)=>{
        if (err) {
            res.send(err);
        } 

        res.json({error: false, message: "Success", data: result.affectedRows});
    });
}


const getInvoiceById = (req, res) => {
    
    const invoiceId = req.params.id;
   Invoice.getInvoiceById(invoiceId, (err, invoice)=>{
        if (err) {
            res.send(err);
        }

        console.log(invoice);
        res.json({error: false, message: "Success", data: invoice});
    });
}


const getAllInvoices = (req, res) => {

    Invoice.getAllInvoices( (err, invoices)=> {
        if (err) {
            res.send(err);
        }

        res.json({error: false, message: "Success", data: invoices})
    });
}

const deleteInvoiceById = (req, res) => {
     const invoiceId = req.params.id;
     console.log("Invoice to delete", invoiceId)
     Invoice.deleteInvoiceById(invoiceId, (err, result)=>{
        if (err) {
            res.send(err);
        }
        res.json({error: false, message: "Success", data: result.affectedRows})
     });
}

const getAllInvoicesView = (req, res) => {
    Invoice.getAllInvoicesView((err, invoices) => {
        if (err) {
            res.send(err);
        }
        res.json({error: false, message: "Success", data: invoices});
    });
}


module.exports = {
    createInvoice,
    updateInvoice,
    getInvoiceById,
    getAllInvoices,
    deleteInvoiceById,
    getAllInvoicesView,
}