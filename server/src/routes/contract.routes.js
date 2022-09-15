const express = require('express');
const router = express.Router();

const contractController = require('../controllers/contract.controller');



//Get all Projects
router.get("/contracts", contractController.getAllContracts);

//Create New Project
router.post("/contracts", contractController.createContract);

//Update Project By Id
router.put("/contracts/:id", contractController.updateContract);

//Get Project By Id 
router.get("/contracts/:id", contractController.getContractById);

//Delete Project By Id
router.delete("/contracts/:id", contractController.deleteContractById);


module.exports = router;