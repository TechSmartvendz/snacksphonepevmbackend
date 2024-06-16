const { TransactionModel } = require("../models/transaction.model");
const { MachineModel } = require("../models/machine.model");
const { EmployeeModel } = require("../models/employee.model");
const { createError } = require("../utils/customError");
const { SlotModel } = require("../models/slot.modle");

// http:// localhost/vendreq/SVZBLR0001?card=111029
// Params= machineid(SVZBLR0001)
// Query = card(111029)

const getAllTransaction = async (req, res, next) => {
    // machineid , employee's cardNo and Date or transaction.

    const { machineid, cardNo, startDate, ...others } = req.query
    // other here direct use key value same at database table
    // added conditions if it is available on queries

    const conditions = {};
    if (machineid) {
        const machine = await MachineModel.findOne({ id: machineid });
        conditions.machineid = machine._id;
    }
    if (cardNo) {
        const employee = await EmployeeModel.findOne({ cardNo });
        conditions.employeeid = employee._id;
    }
    if (startDate) {
        conditions.date = {
            $gte: new Date(startDate),
            $lte: new Date(startDate),
        };
    }

    try {
        const Transactions = await TransactionModel.find(
            { ...others, ...conditions }
        )
            .populate('machineid')
            .populate("employeeid");
        res.send(Transactions)
    } catch (error) {
        next(error)
    }
}

//create
const createTransaction = async (req, res, next) => {
    const machineid = req.params.id;
    const { card, slot } = req.query

    try {
        const machine = await MachineModel.findOne({ id: machineid });
        const employee = await EmployeeModel.findOne({ cardNo: card });

        let status = false;
        let message = "Your are not authorized"
        if (!machine || !employee) {
            message = "employee is not found"
            return next(createError(400, "Card is not valid"))
        }

        else if (machine.companyName === employee.companyName) {
            status = true;
            message = "Your are authorized"
        }
        const newTransaction = new TransactionModel({
            slotName: slot,
            machineid: machine._id,
            employeeid: employee._id,
            transactionStatus: status
        });
        await newTransaction.save();
        res.send({ newTransaction })
    } catch (error) {
        next(error)
    }
}

// Product/Item Vend request from Machine/Employee
const productVendRequestFromMachine = async (req, res, next) => {
    const { machineId, cardNo, slot } = req.params;
    try {
        const employeeDetails = await EmployeeModel.findOne({
            $and: [{ cardNo: cardNo }, { machineId: machineId }]
        });
        const machineDetails = await MachineModel.findOne({
            machineId: machineId
        });
        // console.log('employeeDetails: ', employeeDetails);
        // console.log('machineDetails: ', machineDetails);
        const slotDetails = await SlotModel.findOne({
            $and: [{ slot: slot }, { machineId: machineId }]
        });

        if (!employeeDetails || !machineDetails) {
            return next(createError(400, "For this Machine Card is not Valid!"))
        }

        // if (!slotDetails) {
        //     return next(createError(400, "Slot is not valid"))
        // }

        // limit checking
        // Check if the credit limit needs to be renewed
        const today = new Date().setHours(0, 0, 0, 0);
        const lastRenewed = new Date(employeeDetails.renewedAt).setHours(0, 0, 0, 0);
        console.log('lastRenewed: ', lastRenewed);

        if (machineDetails.limitCycle) {
            if (machineDetails.limitCycle === "daily") {
                if (today > lastRenewed) {
                    employeeDetails.renewedAt = Date.now();
                    employeeDetails.usedLimit = 0;
                }
                if (employeeDetails.usedLimit < machineDetails.limit) {
                    res.status(200).send("success");
                }
                else {
                    return next(createError(400, "Insufficient credit"))
                }
            }

            else if (machineDetails.limitCycle === "weekly") {
                const oneWeekLater = new Date(today + 7 * 24 * 60 * 60 * 1000); // 7 days from today
                if (oneWeekLater > lastRenewed) {
                    employeeDetails.renewedAt = Date.now();
                    employeeDetails.usedLimit = 0;
                }
                if (employeeDetails.usedLimit < machineDetails.limit) {

                }
                else {

                }
            }

            else if (machineDetails.limitCycle === "monthly") {
                const oneMonthLater = new Date(new Date(today).setMonth(new Date(today).getMonth() + 1)); // 1 month from today
                if (oneMonthLater > lastRenewed) {
                    employeeDetails.renewedAt = Date.now();
                    employeeDetails.usedLimit = 0;
                }
                if (employeeDetails.usedLimit < machineDetails.limit) {

                }
                else {

                }
            }
        }
        else {
            res.send("success")
        }

        // const newTransaction = new TransactionModel({
        //     slotName: slot,
        //     machineid: machine._id,
        //     employeeid: employee._id,
        //     transactionStatus: status
        // });
        // await newTransaction.save();
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllTransaction, createTransaction, productVendRequestFromMachine }