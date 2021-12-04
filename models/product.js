const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productid: String,
    title: String,
    price: String,
    category: Array,
    companyid: String,
    sallerid: Array
});

const productmodel = mongoose.model("product", productSchema, "product");

module.exports = productmodel;