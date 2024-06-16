const { EmployeeModel } = require("../models/employee.model");
const { MachineModel } = require("../models/machine.model");

const getAllEmployee = async (req, res, next) => {
    try {
        const employees = await EmployeeModel.find();
        res.send(employees)
    } catch (error) {
        next(error)
    }
}

//add
const addEmployee = async (req, res, next) => {
    const payload = req.body;
    try {
        // here we checking is employee available with same machineId
        const checkEmployeeWithSameMachine = await EmployeeModel.findOne({
            $and: [{ cardNo: payload.cardNo }, { machineId: payload.machineId }]
        });
        if (checkEmployeeWithSameMachine) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Employee alredy present with same machine",
                    cardNo: payload.cardNo
                })
        }

        const newEmployee = new EmployeeModel(payload);
        await newEmployee.save();
        return res.status(200)
            .json({
                success: true,
                message: "Employee added successfully!",
                newEmployee
            })
    } catch (error) {
        next(error)
    }
}
//add
const addBulkEmployee = async (req, res, next) => {
    const payload = req.body;
    try {
        const newEmployee = new EmployeeModel(payload);
        await newEmployee.save();
        res.send(newEmployee)
    } catch (error) {
        next(error)
    }
}
//update
const updateEmployee = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const newEmployee = await EmployeeModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        res.send(newEmployee)
    } catch (error) {
        next(error)
    }
}
//delete
const deleteEmployee = async (req, res, next) => {
    const { id } = req.params;
    try {
        const newEmployee = await EmployeeModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        res.send(newEmployee)
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllEmployee, addEmployee, addBulkEmployee, updateEmployee, deleteEmployee }