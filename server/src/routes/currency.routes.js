const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currency.controller');



//Get all currencys
router.get("/currencies", currencyController.getAllCurrencies);

//Create New currency
router.post("/currencies", currencyController.createCurrency);

//Update currency By Id
router.put("/currencies/:id", currencyController.updateCurrency);

//Get currency By Id 
router.get("/currencies/:id", currencyController.getCurrencyById);

//Delete currency By Id
router.delete("/currencies/:id", currencyController.deleteCurrencyById);


module.exports = router;