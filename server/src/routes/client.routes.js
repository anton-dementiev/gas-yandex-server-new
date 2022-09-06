const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');



//Get all Clients
router.get("/clients", clientController.getAllClients);

//Create New Client
router.post("/clients", clientController.createClient);

//Update Client By Id
router.put("/clients/:id", clientController.updateClient);

//Get Client By Id 
router.get("/clients/:id", clientController.getClientById);

//Delete Client By Id
router.delete("/clients/:id", clientController.deleteClientById);


module.exports = router;