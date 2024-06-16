const { SlotModel } = require("../models/slot.modle");

const getAllSlots = async (req, res, next) => {
    const { machineId } = req.query;
    try {
        let slots = []
        if (machineId) {
            slots = await SlotModel.find({ machineId: machineId });
        }
        else {
            slots = await SlotModel.find();
        }
        return res.status(200)
            .json({
                success: true,
                totalSlots: slots.length,
                slots,
            })
    } catch (error) {
        next(error)
    }
}

//add
const addSlots = async (req, res, next) => {
    const payload = req.body;
    try {
        const newSlots = new SlotModel(payload);
        await newSlots.save();
        return res.status(200)
            .json({
                success: true,
                message: "Slot added successfully!",
                newSlots
            })
    } catch (error) {
        next(error)
    }
}
//add
const addBulkSlots = async (req, res, next) => {
    const payload = req.body;
    try {
        const newSlots = new SlotModel(payload);
        await newSlots.save();
        res.send(newSlots)
    } catch (error) {
        next(error)
    }
}
//update
const updateSlots = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const newSlots = await SlotModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        res.send(newSlots)
    } catch (error) {
        next(error)
    }
}
//update
const updateSlotsByCsv = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const newSlots = await SlotModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        res.send(newSlots)
    } catch (error) {
        next(error)
    }
}
//delete
const deleteSlots = async (req, res, next) => {
    const { id } = req.params;
    try {
        const newSlots = await SlotModel.findByIdAndDelete(id);
        res.send(newSlots)
    } catch (error) {
        next(error)
    }
}

//delete all slots by machineId
const deleteSlotsByMachineId = async (req, res, next) => {
    const { machineId } = req.params;
    try {
        const deletedSlots = await SlotModel.deleteMany({ machineId: machineId });
        return res.status(200)
            .json({
                success: true,
                message: "Slots Deleted successfully!",
                deletedSlots
            })
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllSlots, addSlots, addBulkSlots, updateSlots, updateSlotsByCsv, deleteSlots, deleteSlotsByMachineId }