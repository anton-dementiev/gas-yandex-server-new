const cn = require('../../config/db.config');


const newPayment  = (payment) => {

   return {
    date: payment.date, 
    amount: payment.amount, 
    currency_id: payment.currency_id, 
    exchange_rate: payment.exchange_rate,
    Payment_id: payment.Payment_id,
    description: payment.description,
    created_at: new Date(),
    deleted_at: null,
   }; 

    
};


const createPayment = (newPayment, result) => {

    cn.query("INSERT INTO payments set ?", newPayment, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(false, newPayment);
        }


    });
}

const updatePayment =(paymentId, payment, result) => {

    cn.query("UPDATE payments SET ? WHERE Payment_id=?", [payment, paymentId], (err, rows, fields) =>{
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(false, rows);
        }
    });
}


const getPaymentById = (paymentId, result) => {
  console.log(paymentId);
   cn.query("SELECT * FROM payments WHERE payment_id=?", [paymentId], (err, rows, fields)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(rows);
            result(false, rows);
        }
   });
}

const getAllPayments =  (result) => {
    cn.query("SELECT * FROM payments WHERE deleted_at IS NULL", (err, rows, fields)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else  {
            result(false, rows);
        }
    });
}


const deletePaymentById = (paymentId, result) => {

    console.log(paymentId);

    cn.query("DELETE FROM payments WHERE payment_id=?", [paymentId], (err, rows, fields)=> {
       if (err) {
        console.log("error: ", err);
        result(err, null);
      
       } else {
         result(false, rows);
       }

    });
}


module.exports = {
    newPayment, 
    createPayment, 
    updatePayment,
    getPaymentById,
    getAllPayments,
    deletePaymentById,
};