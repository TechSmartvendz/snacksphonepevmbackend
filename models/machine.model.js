const { Schema, model } = require("mongoose")

const machineSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        default: null
    },
    companyId: {
        type: String,
        required: true,
    },
    machineId: {
        type: String,
        unique: true,
        required: true
    },
    subMachineId: {
        type: String,
        default: "N/A"
    },
    installLocation: {
        type: String,
        default: "N/A"
    },
    limit: {
        type: Number,
        default: 0
    },
    limitCycle: {
        type: String,
        enum: ["daily", "weekly", "monthly", null],
        default: null
    }, // this is for adding limit; if it is assigned then limit checked otherwise not
    totalSlots: {
        type: Number,
        default: 0
    },
    sendEmail: {
        type: Boolean,
        default: false,
    }, // this is for sending mail or not
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const MachineModel = model('machine', machineSchema);

module.exports = { MachineModel }