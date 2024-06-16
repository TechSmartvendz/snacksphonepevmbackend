const { MachineModel } = require("../models/machine.model");

// GET ALL MACHINES DETAILS
const getSingleMachine = async (req, res, next) => {
    const { id } = req.params;
    try {
        const machine = await MachineModel.findById(id);
        return res.status(200)
            .json({
                success: true,
                machine
            })
    } catch (error) {
        next(error)
    }
}
// GET ALL MACHINES DETAILS
const getAllMachine = async (req, res, next) => {
    try {
        const machines = await MachineModel.find();
        return res.status(200)
            .json({
                success: true,
                machines
            })
    } catch (error) {
        next(error)
    }
}

//add
const addMachine = async (req, res, next) => {
    const payload = req.body;
    try {
        const checkMachine = await MachineModel.findOne({ machineId: payload.machineId })
        if (checkMachine) {
            return res.status(200)
                .json({
                    success: false,
                    message: "Machine Already exist!",
                })
        }

        const newMachine = new MachineModel(payload);
        await newMachine.save();
        return res.status(200)
            .json({
                success: true,
                message: "Machine Created successfully!",
                newMachine
            })
    } catch (error) {
        next(error)
    }
}
//add
const addBulkMachine = async (req, res, next) => {
    const { totalSlots, ...payload } = req.body;
    console.log('totalSlots: ', totalSlots);
    try {
        const machineSlots = Array(totalSlots).fill(0).map((item, index) => ({
            slotName: `10${index}`,
            product: null
        }))
        console.log('machineSlots: ', machineSlots);
        // const newMachine = new MachineModel(payload);
        // await newMachine.save();
        res.send(machineSlots)
    } catch (error) {
        next(error)
    }
}
//update
const updateMachine = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const updatedMachine = await MachineModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        return res.status(200)
            .json({
                success: true,
                message: "Machine Details updated successfully!",
                updatedMachine
            })
    } catch (error) {
        next(error)
    }
}
//update
const updateSlotsProduct = async (req, res, next) => {
    const { machineId } = req.params;
    const payload = req.body;
    try {
        const updatedSlots = await MachineModel.updateOne({ machineId: machineId }, { $set: { slots: payload.slots } }, { new: true });
        return res.status(200)
            .json({
                success: true,
                message: "Slots updated successfully!",
                updatedSlots
            })
    } catch (error) {
        next(error)
    }
}
//update by csv file
const updateSlotsProductByCsv = async (req, res, next) => {
    const { machineId } = req.params;
    const payload = req.body;
    try {
        const updatedSlots = await MachineModel.updateOne({ machineId: machineId }, { $set: { slots: payload.slots } }, { new: true });
        return res.status(200)
            .json({
                success: true,
                message: "Slots updated successfully!",
                updatedSlots
            })
    } catch (error) {
        next(error)
    }
}
//delete
const deleteMachine = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedMachine = await MachineModel.findByIdAndDelete(id, { new: true });
        return res.status(200)
            .json({
                success: true,
                message: "Machine has been deleted successfully!",
                Machine: deletedMachine
            })
    } catch (error) {
        next(error)
    }
}


module.exports = { getSingleMachine, getAllMachine, addMachine, addBulkMachine, updateMachine, updateSlotsProduct, updateSlotsProductByCsv, deleteMachine }