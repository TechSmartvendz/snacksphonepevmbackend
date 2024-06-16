const { Schema, model } = require("mongoose")

const companySchema = new Schema({
    companyId: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true
    },
    address: {
        addressLineOne: {
            type: String,
            default: "N/A"
        },
        area: {
            type: String,
            default: "N/A"
        },
        city: {
            type: String,
            default: "N/A"
        },
        state: {
            type: String,
            default: "N/A"
        },
        country: {
            type: String,
            default: "N/A"
        },
        pincode: {
            type: Number,
            default: "N/A"
        },
    },
    phone: {
        type: String,
        default: "N/A"
    },
    email: {
        type: String,
        default: "N/A"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const CompanyModel = model('companies', companySchema);

module.exports = { CompanyModel }