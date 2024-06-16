const { Router } = require("express");
const { getAllProduct, addProduct,addBulkProduct, updateProduct, deleteProduct } = require("../controllers/product");

const productRouter=Router();

//get All product
productRouter.get('/',getAllProduct)
//add
productRouter.post('/add',addProduct)
//add
productRouter.post('/add',addBulkProduct)
//update
productRouter.put('/update/:id',updateProduct)
//delete
productRouter.delete('/delete/:id',deleteProduct)


module.exports={productRouter}