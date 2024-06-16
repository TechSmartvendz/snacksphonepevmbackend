const { Schema, model } = require("mongoose")

const ProductSchema = Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
        unique: true,
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

const ProductModel = model("products", ProductSchema);

module.exports = { ProductModel }
