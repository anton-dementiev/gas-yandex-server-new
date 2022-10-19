const express = require('express');
const router = express.Router();

const contractController = require('../controllers/contract.controller');



//Get all Contracts
router.get("/contracts", contractController.getAllContracts);

//Get All Contracts in a View
router.get("/contracts_view", contractController.getAllContractsView);

//Create New Contract
router.post("/contracts", contractController.createContract);

//Update Contract By Id
router.put("/contracts/:id", contractController.updateContract);

//Get Contract By Id 
router.get("/contracts/:id", contractController.getContractById);

//Delete Contract By Id
router.delete("/contracts/:id", contractController.deleteContractById);


module.exports = router;