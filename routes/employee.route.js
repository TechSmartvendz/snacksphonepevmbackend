const { Router } = require("express");
const { getAllEmployee, addEmployee,addBulkEmployee, updateEmployee, deleteEmployee } = require("../controllers/employee");

const employeeRouter=Router();

//get All employee
employeeRouter.get('/',getAllEmployee)
//add
employeeRouter.post('/add',addEmployee)
//bulk add
employeeRouter.post('/addbulk',addBulkEmployee)
//update
employeeRouter.put('/update/:id',updateEmployee)
//delete
employeeRouter.delete('/delete/:id',deleteEmployee)


module.exports={employeeRouter}