const { Router } = require("express");
const { getSingleMachine,getAllMachine, addMachine,addBulkMachine, updateMachine,updateSlotsProduct,deleteMachine } = require("../controllers/machine");

const machineRouter=Router();

//get All machine
machineRouter.get('/single/:id',getSingleMachine)
//get All machine
machineRouter.get('/getall',getAllMachine)
//add
machineRouter.post('/add',addMachine)
//add
machineRouter.post('/addbulk',addBulkMachine)
//update machine
machineRouter.put('/update/:id',updateMachine)
//delete
machineRouter.delete('/delete/:id',deleteMachine)


module.exports={machineRouter}