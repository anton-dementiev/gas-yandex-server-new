const Payment = require ('../models/payment.model');

const createPayment = (req, res) => {
    
    const newPayment = Payment.newPayment(req.body);

    Payment.createPayment(newPayment, (err, payment)=>{
         if (err) {
             res.send(err);
         }

         res.json({error:false, message: "Success", data: payment})
    });
}


const getPaymentById = (req, res) => {

    const paymentId = req.params.id;
    Payment.getPaymentById(paymentId, (err, payment)=>{
        if (err) {
            res.send(err);
        }

        console.log(payment);
        res.json({error: false, message: "Success", data: payment});
    });
}

const updatePayment = (req, res) => {
    const paymentId = req.params.id;
    const payment = req.body;
    Payment.updatePayment(paymentId, payment, (err, result)=>{
        if (err) {
            res.send(err);
        } 

        res.json({error: false, message: "Success", data: result.affectedRows});
    });
}


const getAllPayments = (req, res) => {

    Payment.getAllPayments( (err, payments)=> {
        
        if (err) {
            res.send(err);
        }

        res.json({error: false, message: "Success", data: payments})
    });
}

const deletePaymentById = (req, res) => {
     const paymentId = req.params.id;
     console.log("Payment to delete", paymentId)
     Payment.deletePaymentById(paymentId, (err, result)=>{
        if (err) {
            res.send(err);
        }
        res.json({error: false, message: "Success", data: result.affectedRows})
     });
}





module.exports = {
    createPayment,
    updatePayment,
    getPaymentById,
    getAllPayments,
    deletePaymentById,
}