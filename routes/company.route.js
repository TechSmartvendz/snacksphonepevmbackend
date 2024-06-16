const { Router } = require("express");
const { getSingleCompany,getAllCompany, addCompany,addBulkCompany, updateCompany, deleteCompany } = require("../controllers/company");

const companyRouter=Router();

//get All Company
companyRouter.get('/single/:id',getSingleCompany)
//get All Company
companyRouter.get('/getall',getAllCompany)
//add
companyRouter.post('/add',addCompany)
//bulk add
companyRouter.post('/addbulk',addBulkCompany)
//update
companyRouter.put('/update/:id',updateCompany)
//delete
companyRouter.delete('/delete/:id',deleteCompany)


module.exports={companyRouter}