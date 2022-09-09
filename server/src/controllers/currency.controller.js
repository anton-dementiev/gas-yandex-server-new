const Currency = require ('../models/currency.model');

const createCurrency = (req, res) => {
    
    const newCurrency = Currency.newCurrency(req.body);

    Currency.createCurrency(newCurrency, (err, currency)=>{
         if (err) {
             res.send(err);
         }

         res.json({error:false, message: "Success", data: currency})
    });
}


const updateCurrency = (req, res) => {

    const currencyId = req.params.id;
    const currency = req.body;

    Currency.updateCurrency(currencyId, currency, (err, result)=>{
        if (err) {
            res.send(err);
        } 

        res.json({error: false, message: "Success", data: result.affectedRows});
    });
}


const getCurrencyById = (req, res) => {
    
    const currencyId = req.params.id;
    const currency = Currency.getCurrencyById(currencyId, (err, currency)=>{
        if (err) {
            res.send(err);
        }

        console.log(currency);
        res.json({error: false, message: "Success", data: currency});
    });
}


const getAllCurrencies = (req, res) => {

     Currency.getAllCurrencies( (err, currencies)=> {
        
        if (err) {
            res.send(err);
        }

        res.json({error: false, message: "Success", data: currencies})
    });
}

const deleteCurrencyById = (req, res) => {
     const currencyId = req.params.id;
     console.log("Currency to delete", currencyId)
     Currency.deleteCurrencyById(currencyId, (err, result)=>{
        if (err) {
            res.send(err);
        }
        res.json({error: false, message: "Success", data: result.affectedRows})
     });
}



module.exports = {
    createCurrency,
    updateCurrency,
    getCurrencyById,
    getAllCurrencies,
    deleteCurrencyById,
}