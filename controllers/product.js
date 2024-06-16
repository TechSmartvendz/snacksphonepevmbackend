const { ProductModel } = require("../models/product.model")

const getAllProduct = async (req, res, next) => {
    try {
        const products = await ProductModel.find();
        res.send(products)
    } catch (error) {
        next(error)
    }
}

//add
const addProduct = async (req, res, next) => {
    const payload = req.body;
    try {
        const newProduct = new ProductModel(payload);
        await newProduct.save();
        res.send(newProduct)
    } catch (error) {
        next(error)
    }
}
//add
const addBulkProduct = async (req, res, next) => {
    const payload = req.body;
    try {
        const newProduct = new ProductModel(payload);
        await newProduct.save();
        res.send(newProduct)
    } catch (error) {
        next(error)
    }
}
//update
const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const newProduct = await ProductModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        res.send(newProduct)
    } catch (error) {
        next(error)
    }
}
//delete
const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const newProduct = await ProductModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        res.send(newProduct)
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllProduct, addProduct,addBulkProduct, updateProduct, deleteProduct }