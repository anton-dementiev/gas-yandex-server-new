const Client = require ('../models/client.model');

const createClient = (req, res) => {
    
    const newClient = Client.newClient(req.body);

    Client.createClient(newClient, (err, client)=>{
         if (err) {
             res.send(err);
         }

         res.json({error:false, message: "Success", data: client})
    });
}


const updateClient = (req, res) => {
    const clientId = req.params.id;
    const client = req.body;
    Client.updateClient(clientId, client, (err, result)=>{
        if (err) {
            res.send(err);
        } 

        res.json({error: false, message: "Success", data: result.affectedRows});
    });
}


const getClientById = (req, res) => {
    
    const clientId = req.params.id;
    const client = Client.getClientById(clientId, (err, client)=>{
        if (err) {
            res.send(err);
        }

        console.log(client);
        res.json({error: false, message: "Success", data: client});
    });
}


const getAllClients = (req, res) => {

    const clients = Client.getAllClients( (err, clients)=> {
        if (err) {
            res.send(err);
        }

        res.json({error: false, message: "Success", data: clients})
    });
}

const deleteClientById = (req, res) => {
     const clientId = req.params.id;
     console.log("Client to delete", clientId)
     Client.deleteClientById(clientId, (err, result)=>{
        if (err) {
            res.send(err);
        }
        res.json({error: false, message: "Success", data: result.affectedRows})
     });
}



module.exports = {
    createClient,
    updateClient,
    getClientById,
    getAllClients,
    deleteClientById,
}