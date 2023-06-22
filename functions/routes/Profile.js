const express = require("express");
const router = express.Router();
const { Products } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares")

//    "/profile" = "/"

router.get("/", validateToken, async (req, res) => {
    try {       

        const profileProducts = await Products.findAll({where: {UserId: req.user.id}});
        res.json(profileProducts)
        
    } catch (e) {console.log(e)}
})

router.get("/test", (req, res) => {
    res.json("IT'S ALIVE!!!");
})


module.exports = router;