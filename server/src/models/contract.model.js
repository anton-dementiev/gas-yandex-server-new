const connectionRequest = require('../../config/db.config');


const newContract  = (contract) => {

   return {

    title: contract.title,
    description: contract.description,
    date_started: contract.date_started,
    date_completed: contract.date_completed,
    client_id: contract.client_id,
    folder_id: contract.folder_id,
    url: contract.url,
    created_at: new Date(),
    deleted_at: null,

    
   }; 

    
};


const createContract = (newContract, result) => {
    let cn = connectionRequest();
    cn.query("INSERT INTO contracts set ?", newContract, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else {
            result(false, newContract);
            cn.destroy();
        }


    });
}


const updateContract =(contractId, contract, result) => {
let cn = connectionRequest();
    cn.query("UPDATE contracts SET ? WHERE contract_id=?", [contract, contractId], (err, rows, fields) =>{
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

const getContractById = (contractId, result) => {
  let cn = connectionRequest();
  console.log(contractId);
   cn.query("SELECT * FROM contracts WHERE contract_id=?", [contractId], (err, rows, fields)=>{
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

const getAllContracts =  (result) => {
    let cn = connectionRequest();
    cn.query("SELECT * FROM contracts WHERE deleted_at IS NULL", (err, rows, fields)=> {
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


const deleteContractById = (contractId, result) => {
    let cn = connectionRequest();
    console.log(contractId);

    cn.query("UPDATE contracts SET deleted_at=? WHERE contract_id=?", [new Date(), contractId], (err, rows, fields)=> {
        
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
    newContract, 
    createContract, 
    updateContract,
    getContractById,
    getAllContracts,
    deleteContractById,
};