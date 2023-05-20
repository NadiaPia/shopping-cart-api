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
});

router.delete("/:id", async (req, res) => {
    const productId = req.params.id ;
    console.log("req.headers.publicId", req.headers.publicid) //because of the headers' value is case sensative publicId from FE turnes to the publicid on the BE
    
    res.json("the delete request received")
})
//https://api.cloudinary.com/v1_1/dhq7myqzj/image/destroy -X POST --data 'public_id=sample&resource_type=video&timestamp=173719931&api_key=436464676&signature=a788d68f86a6f868af'

module.exports = router;

