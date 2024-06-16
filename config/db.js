const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.connect("mongodb+srv://SmartVendz:Smartvendz@cluster0.wt4bcv3.mongodb.net/snacksphonepevm?retryWrites=true&w=majority&appName=Cluster0");

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!");
})

module.exports = { connection }