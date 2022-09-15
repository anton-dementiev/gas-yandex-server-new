const Contract = require ('../models/contract.model');

const createContract = (req, res) => {
    
    const newContract = Contract.newContract(req.body);

    Contract.createContract(newContract, (err, contract)=>{
         if (err) {
             res.send(err);
         }

         res.json({error:false, message: "Success", data: contract})
    });
}


const updateContract = (req, res) => {
    const contractId = req.params.id;
    const contract = req.body;

    Contract.updateContract(contractId, contract, (err, result)=>{

        if (err) {
            res.send(err);
        } 

        res.json({error: false, message: "Success", data: result.affectedRows});
    });
}


const getContractById = (req, res) => {
    
    const contractId = req.params.id;
    Contract.getContractById(contractId, (err, contract)=>{

        if (err) {
            res.send(err);
        }

        console.log(contract);
        res.json({error: false, message: "Success", data: contract});
    });
}


const getAllContracts = (req, res) => {

    Contract.getAllContracts( (err, contracts)=> {
        if (err) {
            res.send(err);
        }

        res.json({error: false, message: "Success", data: contracts})
    });
}

const deleteContractById = (req, res) => {
     const contractId = req.params.id;
     console.log("Contract to delete", contractId)
     Contract.deleteContractById(contractId, (err, result)=>{
        if (err) {
            res.send(err);
        }
        res.json({error: false, message: "Success", data: result.affectedRows})
     });
}



module.exports = {
    createContract,
    updateContract,
    getContractById,
    getAllContracts,
    deleteContractById,
}