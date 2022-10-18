const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');



//Get all Expenses
router.get("/expenses", expenseController.getAllExpenses);

//Get expenses as a view 
router.get("/expenses_view", expenseController.getAllExpensesView);

//Create New Expense
router.post("/expenses", expenseController.createExpense);

//Update Expense By Id
router.put("/expenses/:id", expenseController.updateExpense);

//Get Expense By Id 
router.get("/expenses/:id", expenseController.getExpenseById);

//Delete Expense By Id
router.delete("/expenses/:id", expenseController.deleteExpenseById);


module.exports = router;