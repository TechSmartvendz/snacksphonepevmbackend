const { Router } = require("express");
const { getAllTransaction, createTransaction,productVendRequestFromMachine } = require("../controllers/transactions");
const { verifyToken } = require("../middlewares/verifyToken");

const transactionRouter=Router();

//get All Transaction
// transactionRouter.get('/',verifyToken, getAllTransaction)
transactionRouter.get('/', getAllTransaction)

// Product/Item Vend request from Machine/Employee
transactionRouter.get('/:machineId/:cardNo/:slot',productVendRequestFromMachine)


module.exports={transactionRouter}