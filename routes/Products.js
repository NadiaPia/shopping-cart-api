const express = require("express");
const router = express.Router();
const { Products } = require("../models");



//    "/products" = "/"

router.post("/", async (req, res) => {
    try {
        console.log("IMAGE UPLOADED");
        //console.log("req.body", req.body);
        const newProduct = req.body;
        const product = await Products.create(newProduct);
        res.json("image is set up in the DB");
    } catch (e) {console.log(e)}
})


module.exports = router;