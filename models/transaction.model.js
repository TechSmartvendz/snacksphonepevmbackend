const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    machineId: {
        type: String,
        required: true
    },
    slotName: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: "employees",
        default: null
    },
    machine: {
        type: Schema.Types.ObjectId,
        ref: "machines",
        default: null
    },
    transactionStatus: {
        type: Boolean,
        default: false
    },
    rejectedReason: {
        type: String,
        default: "N/A"
    },
}, { timestamps: true });

const TransactionModel = model('transaction', transactionSchema);

module.exports = { TransactionModel }