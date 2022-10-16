const Expense = require ('../models/expense.model');

const createExpense = (req, res) => {
    
    const newExpense = Expense.newExpense(req.body);

    Expense.createExpense(newExpense, (err, expense)=>{
         if (err) {
             res.send(err);
         }

         res.json({error:false, message: "Success", data: expense})
    });
}


const updateExpense = (req, res) => {
    const expenseId = req.params.id;
    const expense = req.body;
    Expense.updateExpense(expenseId, expense, (err, result)=>{
        if (err) {
            res.send(err);
        } 

        res.json({error: false, message: "Success", data: result.affectedRows});
    });
}


const getExpenseById = (req, res) => {
    
    const expenseId = req.params.id;
   Expense.getExpenseById(expenseId, (err, expense)=>{
        if (err) {
            res.send(err);
        }

        console.log(expense);
        res.json({error: false, message: "Success", data: expense});
    });
}


const getAllExpenses = (req, res) => {

    Expense.getAllExpenses( (err, expenses)=> {
        if (err) {
            res.send(err);
        }

        res.json({error: false, message: "Success", data: expenses})
    });
}

const deleteExpenseById = (req, res) => {
     const expenseId = req.params.id;
     console.log("Expense to delete", expenseId)
     Expense.deleteExpenseById(expenseId, (err, result)=>{
        if (err) {
            res.send(err);
        }
        res.json({error: false, message: "Success", data: result.affectedRows})
     });
}



module.exports = {
    createExpense,
    updateExpense,
    getExpenseById,
    getAllExpenses,
    deleteExpenseById,
}