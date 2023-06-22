const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const { Products } = require("../models");
const { default: axios } = require("axios");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const sequelize = require("sequelize");


//    "/products" = "/"

router.get("/", async (req, res) => {
    try {
        const allProducts = await Products.findAll();
        res.json(allProducts);        
    } catch (e) {console.log(e)}
})

router.get("/filter", async (req, res) => {
    try {
        //console.log("req.headers.searchitem", req.headers.searchitem)
        const searchItem = req.headers.searchitem;
        const filterProducts = await Products.findAll({
            where: {title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + searchItem + '%')}
        });        
        res.json(filterProducts);

    } catch (error) {console.log(error)};

});

router.post("/", validateToken, async (req, res) => {
    try {
        if(!req.body?.imageUrl) {
            return res.status(500).json({error: 'image is missing'})
        }
        console.log("IMAGE UPLOADED");
        
        const newProduct = req.body; 
        newProduct.UserId = req.user.id;
        //console.log("req.body", req.body) //{image: 'http://res.cloudinary.com/dhq7myqzj/image/upload/v1684455040/fgljd5eacdhjirya0kdm.jpg'}
        //console.log("newProduct", newProduct) //{
            //imageUrl: 'http://res.cloudinary.com/dhq7myqzj/image/upload/v1686077979/rolv26sbdjhztkym2fz4.png',
            //publicId: 'rolv26sbdjhztkym2fz4',
            //title: 'dreeees',
            //price: '14',
            //UserId: 1
          //}
        const product = await Products.create(newProduct);
        res.json("product" );
    } catch (e) {console.log(e)}
});


router.delete("/:id", async (req, res) => {
    const productId = req.params.id ;
    //console.log("req.headers.publicId", req.headers.publicid) //because of the headers' value is case sensative publicId from FE turnes to the publicid on the BE
    
    let product = await Products.findOne({where: {id: productId}});

    //delete image from the cloudinary
    try{
        await cloudinary.uploader.destroy(product.publicId);
    }
    catch(e) {console.log("error", e)}
    //console.log("deleted from cloudinary")

    //delete the whole product from the db
    await Products.destroy({where: {id: productId}});
    res.json("DELETED SUCCESFULLY");
})


module.exports = router;

