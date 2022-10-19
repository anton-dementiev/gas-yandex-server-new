const connectionRequest = require('../../config/db.config');


const newInvoice  = (invoice) => {

   return {

    prefix:             invoice.prefix,
    date:               invoice.date,
    due_date:           invoice.due_date,
    invoice_total:      invoice.invoice_total,
    description:        invoice.description,
    payment_total:      invoice.payment_total,
    currency_id:        invoice.currency_id,
    bank_account_id:    invoice.bank_account_id,
    payment_method_id:  invoice.payment_method_id,
    client_id:          invoice.client_id,
    file_id:            invoice.file_id,

    created_at:         new Date(),
    deleted_at:         null,

    
   }; 

    
};


const createInvoice = (newInvoice, result) => {

   let cn = connectionRequest();
   cn.query("INSERT INTO invoices set ?", newInvoice, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else {
            result(false, newInvoice);
            cn.destroy();
        }


    });
}

const updateInvoice =(invoiceId, invoice, result) => {

    let cn = connectionRequest();
    cn.query("UPDATE invoices SET ? WHERE invoice_id=?", [invoice, invoiceId], (err, rows, fields) =>{
        if (err) {
            console.log("error", err);
            result(err, null);
            cn.destroy();
        } else {
            result(false, rows);
            cn.destroy();
        }
    });
}


const getInvoiceById = (invoiceId, result) => {
  console.log(invoiceId);
  let cn = connectionRequest();

   cn.query("SELECT * FROM invoices WHERE invoice_id=?", [invoiceId], (err, rows, fields)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else {
            console.log(rows);
            result(false, rows);
            cn.destroy();
        }
   });
}

const getAllInvoices =  (result) => {

    let cn = connectionRequest();
    cn.query("SELECT * FROM invoices WHERE deleted_at IS NULL", (err, rows, fields)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else  {
            console.log(rows);
            result(false, rows);
            cn.destroy();
        }
    });
}


const deleteInvoiceById = (invoiceId, result) => {

    console.log(invoiceId);
    
    let cn = connectionRequest();

    cn.query("UPDATE invoices SET deleted_at=? WHERE invoice_id=?", [new Date(), invoiceId], (err, rows, fields)=> {
       if (err) {
        console.log("error: ", err);
        result(err, null);
        cn.destroy();
      
       } else {
         result(false, rows);
         cn.destroy();
       }

    });
}

const getAllInvoicesView = (result) => {
    let cn = connectionRequest();
    cn.query("SELECT * FROM invoices_view", (err, rows, fields)=>{
        if (err) {
            console("error: ", err);
            result(err, null);
            cn.destroy();
        } else {
            result(false, rows);
            cn.destroy();
        }
    });
}


module.exports = {
    newInvoice, 
    createInvoice, 
    updateInvoice,
    getInvoiceById,
    getAllInvoices,
    deleteInvoiceById,
    getAllInvoicesView,
};