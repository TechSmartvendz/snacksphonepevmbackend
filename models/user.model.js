const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin",
        enum: ["admin", "superAdmin"]
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "companies"
    }
}, { timestamps: true })

const UserModel = model('users', UserSchema);

module.exports = { UserModel }