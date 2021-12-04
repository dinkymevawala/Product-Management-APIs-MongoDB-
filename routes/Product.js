const express = require('express')
const router = express.Router()
router.use(express.json());

const productmodel = require("../models/product");

router.get("/", async(req, res) => {
    const productList = await productmodel.find();

    if (productList.length === 0) {
        return res.json({ message: "No data found on Product" })
    }
    return res.json({ data: productList });
});

router.post("/", (req, res) => {
    const newProduct = req.body;
    productmodel.create(newProduct);
    return res.json({ message: "Product add successfully" });
})

router.put("/:name", async(req, res) => {
   
    const name = req.params.name;
    const category = req.body.category;
    const productList = await productmodel.find({ "title": name })

    if (productList.length < 1) {
        return res.json({ "Message": "Sorry no data found of product name " + name })
    }
    productmodel.findByIdAndUpdate(productList[0]._id, { category: category }, function(err, docs) {
        if (err) {
            log(err);
        } else {
            res.json({ "Updated Data : ": docs });
        }
    });
})

router.delete("/:name", async(req, res) => {
    const name = req.params.name;

    productmodel.deleteMany({ "title": name }).then(function() {
        console.log("Data deleted"); 
        return res.send("Data deleted");
    }).catch(function(error) {
        console.log(error); 
        return res.send(error);
    });
});

module.exports = router