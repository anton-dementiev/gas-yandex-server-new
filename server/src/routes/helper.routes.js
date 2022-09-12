const express = require('express');
const router = express.Router();

const helperController = require('../controllers/helper.controller');




//Get CBR rate 
router.get("/helpers/cbr", helperController.getRate);




module.exports = router;