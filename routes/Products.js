const express = require("express");
const router = express.Router();


//    "/products" = "/"

router.post("/", async (req, res) => {
    console.log("IMAGE UPLOADED");
    console.log("req.body", req.body)
})



module.exports = router;