const Employee = require ('../models/employee.model');

const createEmployee = (req, res) => {
    
    const newEmp = Employee.newEmployee(req.body);

    Employee.createEmployee(newEmp, (err, employee)=>{
         if (err) {
             res.send(err);
         }

         res.json({error:false, message: "Success", data: employee})
    });
}


const getEmployeeById = (req, res) => {

    const employeeId = req.params.id;
    Employee.getEmployeeById(employeeId, (err, employee)=>{
        if (err) {
            res.send(err);
        }

        console.log(employee);
        res.json({error: false, message: "Success", data: employee});
    });
}

const updateEmployee = (req, res) => {
    const employeeId = req.params.id;
    const employee = req.body;
    Employee.updateEmployee(employeeId, employee, (err, result)=>{
        if (err) {
            res.send(err);
        } 

        res.json({error: false, message: "Success", data: result.affectedRows});
    });
}


const getAllEmployees = (req, res) => {

    Employee.getAllEmployees( (err, employees)=> {
        if (err) {
            res.send(err);
        }

        res.json({error: false, message: "Success", data: employees})
    });
}

const deleteEmployeeById = (req, res) => {
     const employeeId = req.params.id;
     console.log("Employee to delete", employeeId)
     Employee.deleteEmployeeById(employeeId, (err, result)=>{
        if (err) {
            res.send(err);
        }
        res.json({error: false, message: "Success", data: result.affectedRows})
     });
}





module.exports = {
    createEmployee,
    updateEmployee,
    getEmployeeById,
    getAllEmployees,
    deleteEmployeeById,
}