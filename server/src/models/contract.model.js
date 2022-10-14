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


const newContractItems = (items) => {

    if (!items) {
        return null;
    }

    return items.map(item => {

        return {
            title: item.title,
            qty: item.qty || 0, 
            amount: item.amount || null,
            project_id: item.project_id || null, 
            contract_id: item.contract_id,
            created_at: new Date(),
            deleted_at: null,
        }
    });

   
};


const createContract = (newContract, contractItems,  result) => {

    let cn = connectionRequest();
   // let prevQuery = "INSERT INTO contracts set ?";


    //INSERT CONTRACTS AND CONTRACT_ITEMS
    cn.beginTransaction(err=>{
        if (err) {
            console.log("Begin transaction error: ", err);
            result(err, null);
            cn.destroy();
        }

        console.log(newContract);

        //CONTRACTS
        cn.query("INSERT INTO contracts SET ?", newContract, (err, results, fields)=>{
            if(err) {
                return cn.rollback(()=>{
                    console.log("Insert into contracts error: ",err);
                    result(err, null);
                    cn.destroy();
                });          
            }

            
            //ITEMS
            if (contractItems) {

                console.log(results);
                const contractId = results.insertId;
                contractItems = contractItems.map(item => {
                  item.contract_id = contractId;
                  return Object.values(item);
                });

                console.log(contractItems);

                cn.query("INSERT INTO contract_items (title, qty, amount, project_id, contract_id, created_at, deleted_at) VALUES ?", [contractItems], (err, results, fields)=>{
                    if (err) {
                       return cn.rollback(()=>{
                            console.log("Insert into items error ", err);
                            result(err, null);
                            cn.destroy();
                        });     
                    }
                });
            }

            cn.commit(err=>{
                if (err) {
                   return cn.rollback(()=>{
                        console.log("commit error ", err);
                        result(err, null);
                        cn.destroy();
                    });
                }

                result(false, results);
            });


        });

    



    });

//     cn.query("INSERT INTO contracts set ?", newContract, (err, res)=>{
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             cn.destroy();
//         } else {
//             result(false, newContract);
//             cn.destroy();
//         }


//     });
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
   cn.query("SELECT * FROM contracts WHERE contract_id=?", [contractId], (err, results, fields)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else {
            cn.query("SELECT * FROM contract_items WHERE contract_id=?", [contractId], (err, items)=>{
                console.log(items);
                if (err) {
                    console.log("error :", err);
                    result(err, null);
                    cn.destroy();
                } else {
                    console.log("COntract by ID")
                    if (results.length > 0) {
                        results[0].items = items;
                    } 
                    
                    console.log(results);
                    result(false, results);
                    cn.destroy();
                }
            });
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
    newContractItems,
    createContract, 
    updateContract,
    getContractById,
    getAllContracts,
    deleteContractById,
};