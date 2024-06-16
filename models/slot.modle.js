const { Schema, model } = require("mongoose")

const SlotSchema = Schema({
    machineId: {
        type: String,
        required: true,
    },
    slot: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        default: null
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: "N/A",
    },
    price: {
        type: Number,
        required: true
    },
    mass: {
        type: String,
        default: "N/A",
    },
    unit: {
        type: String,
        default: "N/A",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const SlotModel = model("slots", SlotSchema);

module.exports = { SlotModel }
