const express = require("express");
const router = express.Router();
const { Cart } = require("../models");

//    "/carts" = "/";

router.post("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        console.log("reqreqreqreq.body**************", req.body); //{ userId: 54, quantity: 0 }
        const { userId, quantity } = req.body
        console.log("productId", productId) //4
        const cartProduct = await Cart.create({ ProductId: productId, UserId: userId, quantity: quantity })
        res.json(cartProduct)
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error })
    }

});

router.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const { userId, quantity } = req.body       
        const cartProduct = await Cart.update({ quantity: quantity}, { where: { ProductId: productId, UserId: userId } })        
        res.json(cartProduct)
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error })
    }
    
})



module.exports = router;