const { Router } = require("express");
const { getAllSlots, addSlots, addBulkSlots, updateSlots, deleteSlots, updateSlotsByCsv, deleteSlotsByMachineId } = require("../controllers/slot");

const slotRouter = Router();

//get All slots
slotRouter.get('/getall', getAllSlots)
//add
slotRouter.post('/add', addSlots)
//add
slotRouter.post('/bluk/add', addBulkSlots)
//update
slotRouter.put('/update/:id', updateSlots)
//update slots by json
slotRouter.put('/update/slots/:machineId', updateSlots)
//update slots by csv file
slotRouter.put('/update/csv/slots/:machineId', updateSlotsByCsv)
//delete single
slotRouter.delete('/delete/:id', deleteSlots)
//delete all by machine Id
slotRouter.delete('/deleteall/machine/:machineId', deleteSlotsByMachineId)


module.exports = { slotRouter }