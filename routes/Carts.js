const express = require("express");
const router = express.Router();
const { Cart } = require("../models");
const { Products } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddlewares")


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

//change the quantity of items

router.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const { userId, quantity } = req.body
        const cartProduct = await Cart.update({ quantity: quantity }, { where: { ProductId: productId, UserId: userId } })
        res.json(cartProduct)
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error })
    }

})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        await Cart.destroy({ where: { id: id } })
        res.json("PRODUCT DELETED FROM CART")
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error })
    }


})

router.get("/", validateToken, async (req, res) => {
    try {
        //console.log("req.cookies", req.cookies) //'access-tokennn': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hZGlhIiw...'
        //console.log("req.user", req.user) // { username: 'nadia', id: 1, iat: 1685404834 }

        const user = req.user //req.user is from validateToken        
        const cartProducts = await Cart.findAll({ where: { UserId: user.id }, include: [{ model: Products, reqired: true }] })
        res.json(cartProducts)


    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error })
    }

});



module.exports = router;