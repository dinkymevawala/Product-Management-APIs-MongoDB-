const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyid: String,
    name: String,
    productid: Array
});

const companymodel = mongoose.model("company", companySchema, "company");

module.exports = companymodel;