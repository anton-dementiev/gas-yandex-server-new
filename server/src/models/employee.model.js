const connectionRequest = require('../../config/db.config');


const newEmployee  = (employee) => {

   return {
    first_name: employee.first_name,
    last_name: employee.last_name,
    email: employee.email,
    description: employee.description,
    created_at: new Date(),
    deleted_at: null,
    
   }; 

    
};


const createEmployee = (newEmp, result) => {
    let cn = connectionRequest();
    cn.query("INSERT INTO employees set ?", newEmp, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(false, newEmp);
        }


    });
}


const getEmployeeById = (employeeId, result) => {
  console.log(employeeId);
let cn = connectionRequest();
   cn.query("SELECT * FROM employees WHERE employee_id=?", [employeeId], (err, rows, fields)=>{
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

const updateEmployee =(employeeId, employee, result) => {
let cn = connectionRequest();
    cn.query("UPDATE employees SET ? WHERE employee_id=?", [employee, employeeId], (err, rows, fields) =>{
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

const getAllEmployees =  (result) => {
let cn = connectionRequest();
    cn.query("SELECT * FROM employees WHERE deleted_at IS NULL", (err, rows, fields)=> {
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


const deleteEmployeeById = (employeeId, result) => {

    console.log(employeeId);
let cn = connectionRequest();
    cn.query("UPDATE employees SET deleted_at=? WHERE employee_id=?", [new Date(), employeeId], (err, rows, fields)=> {
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
    newEmployee, 
    createEmployee, 
    updateEmployee,
    getEmployeeById,
    getAllEmployees,
    deleteEmployeeById,
};