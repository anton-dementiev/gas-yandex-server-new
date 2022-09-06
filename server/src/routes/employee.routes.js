const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');



//Get all Employees
router.get("/employees", employeeController.getAllEmployees);

//Create New Employee
router.post("/employees", employeeController.createEmployee);

//Update Employee By Id
router.put("/employees/:id", employeeController.updateEmployee);

//Get Employee By Id 
router.get("/employees/:id", employeeController.getEmployeeById);


//Delete Employee By Id
router.delete("/employees/:id", employeeController.deleteEmployeeById);


module.exports = router;