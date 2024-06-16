const { CompanyModel } = require("../models/company.model");

// Get All Companies
const getSingleCompany = async (req, res, next) => {
    const { id } = req.params;
    try {
        const company = await CompanyModel.findById(id);
        return res.status(200)
        .json({
            success: true,
            company
        })
    } catch (error) {
        next(error)
    }
}
// Get All Companies
const getAllCompany = async (req, res, next) => {
    try {
        const companies = await CompanyModel.find();
        return res.status(200)
        .json({
            success: true,
            companies
        })
    } catch (error) {
        next(error)
    }
}

//add Company
const addCompany = async (req, res, next) => {
    const payload = req.body;
    // console.log('payload: ', payload);
    try {
        const newCompany = new CompanyModel(payload);
        await newCompany.save();
        return res.status(200)
            .json({
                success: true,
                message: "Company Details added successfully!",
                newCompany
            })
    } catch (error) {
        next(error)
    }
}
//add Bulk Companies
const addBulkCompany = async (req, res, next) => {
    const payload = req.body;
    try {
        const newCompany = new CompanyModel(payload);
        await newCompany.save();
        res.send(newCompany)
    } catch (error) {
        next(error)
    }
}
//update
const updateCompany = async (req, res, next) => {
    const { id } = req.params;
    console.log('id: ', id);
    const payload = req.body;
    try {
        const updatedCompany = await CompanyModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        return res.status(200)
            .json({
                success: true,
                message: "Company Details updated successfully!",
                updatedCompany
            })
    } catch (error) {
        next(error)
    }
}
//delete
const deleteCompany = async (req, res, next) => {
    const { id } = req.params;
    try {
        const softDeletedCompany = await CompanyModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        return res.status(200)
            .json({
                success: true,
                message: "Company (Soft) deleted successfully!",
            })
    } catch (error) {
        next(error)
    }
}


module.exports = { getSingleCompany, getAllCompany, addCompany, addBulkCompany, updateCompany, deleteCompany }