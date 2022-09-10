const connectionRequest = require('../../config/db.config');


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

   let cn = connectionRequest();
   cn.query("INSERT INTO clients set ?", newClient, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else {
            result(false, newClient);
            cn.destroy();
        }


    });
}

const updateClient =(clientId, client, result) => {

    let cn = connectionRequest();
    cn.query("UPDATE clients SET ? WHERE client_id=?", [client, clientId], (err, rows, fields) =>{
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


const getClientById = (clientId, result) => {
  console.log(clientId);
  let cn = connectionRequest();

   cn.query("SELECT * FROM clients WHERE client_id=?", [clientId], (err, rows, fields)=>{
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

const getAllClients =  (result) => {
    let cn = connectionRequest();
    cn.query("SELECT * FROM clients WHERE deleted_at IS NULL", (err, rows, fields)=> {
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


const deleteClientById = (clientId, result) => {

    console.log(clientId);
    
    let cn = connectionRequest();

    cn.query("UPDATE clients SET deleted_at=? WHERE client_id=?", [new Date(), clientId], (err, rows, fields)=> {
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
    newClient, 
    createClient, 
    updateClient,
    getClientById,
    getAllClients,
    deleteClientById,
};