const express = require("express");
const router = express.Router();
const { Products } = require("../models");



//    "/products" = "/"

router.get("/", async (req, res) => {
    try {
        const allProducts = await Products.findAll();
        res.json(allProducts)
        console.log("allProducts", allProducts)
    } catch (e) {console.log(e)}
})


router.post("/", async (req, res) => {
    try {
        if(!req.body?.imageUrl) {
            return res.status(500).json({error: 'image is missing'})
        }
        //console.log("IMAGE UPLOADED");
        console.log("req.body", req.body);
        const newProduct = req.body; 
        console.log("req.body", req.body) //{image: 'http://res.cloudinary.com/dhq7myqzj/image/upload/v1684455040/fgljd5eacdhjirya0kdm.jpg'}
        const product = await Products.create(newProduct);
        res.json("product" );
    } catch (e) {console.log(e)}
})


module.exports = router;