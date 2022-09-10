const connectionRequest = require('../../config/db.config');


const newCurrency  = (currency) => {

   return {
    title: currency.title,
    symbol: currency.symbol,
    code: currency.code,
    cbr_code: currency.cbr_code,
    created_at: new Date(),
    deleted_at: null,

    
   }; 

    
};


const createCurrency = (newCurrency, result) => {
    let cn = connectionRequest();
    cn.query("INSERT INTO currencies set ?", newCurrency, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else {
            result(false, newCurrency);
            cn.destroy();
        }


    });
}

const updateCurrency =(currencyId, currency, result) => {
    let cn = connectionRequest();
    cn.query("UPDATE currencies SET ? WHERE currency_id=?", [currency, currencyId], (err, rows, fields) =>{
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


const getCurrencyById = (currencyId, result) => {
  console.log(currencyId);
  let cn = connectionRequest();
  
   cn.query("SELECT * FROM currencies WHERE currency_id=?", [currencyId], (err, rows, fields)=>{
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

const getAllCurrencies =  (result) => {
    let cn = connectionRequest();
    cn.query("SELECT * FROM currencies WHERE deleted_at IS NULL", (err, rows, fields)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else  {
            result(false, rows);
            cn.destroy();
        }
    });
}


const deleteCurrencyById = (currencyId, result) => {

    console.log(currencyId);
    let cn = connectionRequest();
    cn.query("UPDATE currencies SET deleted_at=? WHERE currency_id=?", [new Date(), currencyId], (err, rows, fields)=> {
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
    newCurrency, 
    createCurrency, 
    updateCurrency,
    getCurrencyById,
    getAllCurrencies,
    deleteCurrencyById,
};