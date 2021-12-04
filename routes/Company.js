const { json } = require('express');
const express = require('express')
const router = express.Router()
router.use(express.json());

const companymodel = require("../models/company");
const productmodel = require('../models/product');

router.get("/", async(req, res) => {
    const companyList = await companymodel.find();

    if (companyList.length === 0) {
        return res.json({ message: "No data found on Company" })
    }
    return res.json({ data: companyList });
});


router.get("/:name", async(req, res) => {
    const name = req.params.name

    const productmodel = require("../models/product");

    const index = await productmodel.find({ title: name });

    if (index.length < 1) {
        return res.json({ message: "Sorry No data found by name of ${name}" })
    }

    const companyIndex = await companymodel.find({ id: index[0].id });

    if (companyIndex.length < 1) {
        return res, json({ message: "Sorry No data found by name of ${name}" })
    }

    return res.json({
        "Company Name": companyIndex[0].name,
        "Product Name": index[0].title,
    })
});

router.get("/product/all", async(req, res) => {
    const companyList = await companyodel.find();

    if (companyList.length === 0) {
        return res.json({ message: "No data found on Company" })
    }
    const jsonOutput = []

    for (var i = 0; i < companyList.length; i++) {
        productName = []

        var countProduct = companyList[i].productid;

        for (var j = 0; j < countProduct.length; j++) {
            const productList = await productmodel.find({ "productid": countProduct[j] })

            productName[j] = productList[0].title;
        }

        jsonOutput.push({
            "Company Name": companyList[i].name,
            "Product Name": productName
        })
    }

    return res.json({ jsonOutput });
});

router.post("/", (req, res) => {
    const newcompany = req.body;
    companymodel.create(newcompany);
    return res.json({ message: "Company add successfully" });
});

router.put("/:name", async(req, res) => {
    const name = req.params.name;

    const ids = req.body.productid;
    console.log(ids);

    const companyList = await companymodel.find({ "name": name })

    if (companyList.length < 1) {
        return res.json({ "Message": "Sorry no data found of company name " + name })
    }
    companymodel.findByIdAndUpdate(companyList[0]._id, { productid: ids }, function(err, docs) {
        if (err) {
            log(err);
        } else {
            res.json({ "Updated Data : ": docs });
        }
    });
})

router.delete("/:name", async(req, res) => {
    const name = req.params.name;

    productmodel.deleteMany({ "name": name }).then(function() {
        console.log("Data deleted"); 
        return res.send("Data deleted"); 
    }).catch(function(error) {
        console.log(error); 
        return res.send(error); 
    });
});

module.exports = router