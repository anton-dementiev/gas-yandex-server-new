const connectionRequest = require('../../config/db.config');


const newPayment  = (payment) => {

   return {
    date: payment.date, 
    amount: payment.amount, 
    currency_id: payment.currency_id, 
    exchange_rate: payment.exchange_rate,
    client_id: payment.client_id,
    description: payment.description,
    created_at: new Date(),
    deleted_at: null,
   }; 

    
};


const createPayment = (newPayment, result) => {
    let cn = connectionRequest();
    cn.query("INSERT INTO payments set ?", newPayment, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else {
            result(false, newPayment);
            cn.destroy();
        }


    });
}

const updatePayment =(paymentId, payment, result) => {
    let cn = connectionRequest();
    cn.query("UPDATE payments SET ? WHERE Payment_id=?", [payment, paymentId], (err, rows, fields) =>{
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


const getPaymentById = (paymentId, result) => {
    console.log(paymentId);
    let cn = connectionRequest();
   cn.query("SELECT * FROM payments WHERE payment_id=?", [paymentId], (err, rows, fields)=>{
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

// const getAllPayments =  (result) => {
//     let cn = connectionRequest();
//     cn.query("SELECT * FROM payments WHERE deleted_at IS NULL", (err, rows, fields)=> {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             cn.destroy();
//         } else  {
//             result(false, rows);
//             cn.destroy();
//         }
//     });
// }


const getAllPayments =  (result) => {
    let cn = connectionRequest();
    cn.query("SELECT * FROM view_payments", (err, payments, fields)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else  {
            cn.query("SELECT client_id, name from clients", (err, clients, fields)=>{
                if (err) {
                    console.log("error: ", err);
                    cn.destroy();
                } else {
                    cn.query("SELECT currency_id, title from currencies", (err, currencies, fields)=>{
                        if (err) {
                            console.log("error: ", err);
                            cn.destroy();
                        } else {
                            result(false, {payments: payments, clientsDropdown: clients, currenciesDropdown: currencies});
                            cn.destroy();
                        }
                    });
                }
            });
        }
    });
}


const deletePaymentById = (paymentId, result) => {
let cn = connectionRequest();
    console.log(paymentId);

    cn.query("DELETE FROM payments WHERE payment_id=?", [paymentId], (err, rows, fields)=> {
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


module.exports = {
    newPayment, 
    createPayment, 
    updatePayment,
    getPaymentById,
    getAllPayments,
    deletePaymentById,
};