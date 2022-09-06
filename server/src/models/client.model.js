const cn = require('../../config/db.config');


const newClient  = (client) => {

   return {

    name: client.name,
    description: client.description, 
    address: client.address,
    city: client.city, 
    state: client.state,
    zip: client.zip,
    country: client.country,
    website: client.website,
    folder_id: client.folder_id,
    created_at: new Date(),
    deleted_at: null,

    
   }; 

    
};


const createClient = (newClient, result) => {

    cn.query("INSERT INTO clients set ?", newClient, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(false, newClient);
        }


    });
}

const updateClient =(clientId, client, result) => {

    cn.query("UPDATE clients SET ? WHERE client_id=?", [client, clientId], (err, rows, fields) =>{
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(false, rows);
        }
    });
}


const getClientById = (clientId, result) => {
  console.log(clientId);
   cn.query("SELECT * FROM clients WHERE client_id=?", [clientId], (err, rows, fields)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(rows);
            result(false, rows);
        }
   });
}

const getAllClients =  (result) => {
    cn.query("SELECT * FROM clients WHERE deleted_at IS NULL", (err, rows, fields)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else  {
            result(false, rows);
        }
    });
}


const deleteClientById = (clientId, result) => {

    console.log(clientId);

    cn.query("UPDATE clients SET deleted_at=? WHERE client_id=?", [new Date(), clientId], (err, rows, fields)=> {
       if (err) {
        console.log("error: ", err);
        result(err, null);
      
       } else {
         result(false, rows);
       }

    });
}


module.exports = {
    newClient, 
    createClient, 
    updateClient,
    getClientById,
    getAllClients,
    deleteClientById,
};