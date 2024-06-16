const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
    companyId: {
        type: String,
        required: true,
    },
    machineId: {
        type: String,
        required: true,
        unique: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "companies"
    },
    cardNo: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        default: "N/A"
    },
    employeeName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    usedLimit: {
        type: Number,
        default: 0,
    },
    transactionCount: {
        type: Number,
        default: 0,
    },
    transactionAmount: {
        type: Number,
        default: 0,
    },
    renewedAt: {
        type: Date,
        default: Date.now() - 86400000,
    },
}, { timestamps: true });

const EmployeeModel = model('employees', employeeSchema);

module.exports = { EmployeeModel }