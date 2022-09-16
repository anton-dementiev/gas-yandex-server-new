const connectionRequest = require('../../config/db.config');


const newContract  = (contract) => {

   return {

    title: contract.title,
    description: contract.description,
    projected_total: contract.projected_total,
    actual_total: contract.actual_total,
    rate: contract.rate,
    projected_budget: contract.projected_budget,
    actual_budget: contract.actual_budget,
    currency_id: contract.currency_id,
    date_signed: contract.date_signed,
    date_closed: contract.date_closed,
    client_id: contract.client_id,
    is_terminated: contract.is_terminated,
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