const connectionRequest = require('../../config/db.config');


const newExpense  = (expense) => {

   return {

    amount: expense.amount, 
    date: expense.date, 
    currency_id: expense.currency_id,
    exchange_rate: expense.exchange_rate,
    expense_category_id: expense.exchange_category_id, 
    contract_id: expense.contract_id,
    project_id: expense.project_id,
    employee_id: expense.employee_id,
    description: expense.description,
    created_at: new Date(),
    deleted_at: null,

    
   }; 

    
};


const createExpense = (newExpense, result) => {

   let cn = connectionRequest();
   cn.query("INSERT INTO expenses set ?", newExpense, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else {
            result(false, newExpense);
            cn.destroy();
        }


    });
}

const updateExpense =(expenseId, expense, result) => {

    let cn = connectionRequest();
    cn.query("UPDATE expenses SET ? WHERE expense_id=?", [expense, expenseId], (err, rows, fields) =>{
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


const getExpenseById = (expenseId, result) => {
  console.log(expenseId);
  let cn = connectionRequest();

   cn.query("SELECT * FROM expenses WHERE expense_id=?", [expenseId], (err, rows, fields)=>{
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

const getAllExpenses =  (result) => {

    let cn = connectionRequest();
    cn.query("SELECT * FROM expenses WHERE deleted_at IS NULL", (err, rows, fields)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            cn.destroy();
        } else  {
            console.log(rows);
            result(false, rows);
            cn.destroy();
        }
    });
}


const deleteExpenseById = (expenseId, result) => {

    console.log(expenseId);
    
    let cn = connectionRequest();

    cn.query("UPDATE expenses SET deleted_at=? WHERE expense_id=?", [new Date(), expenseId], (err, rows, fields)=> {
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
    newExpense, 
    createExpense, 
    updateExpense,
    getExpenseById,
    getAllExpenses,
    deleteExpenseById,
};