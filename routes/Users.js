const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require('jsonwebtoken');




//    "/auth" = "/";

router.post("/", async(req, res) => {
    const { username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
        res.json("------------USER IS SET UP TO THE DB---------------")
    }).catch((err) => {
        if(err) {
            res.status(400).json({error: err});
        }
    })
})

router.post("/login", async(req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({where: {username: username}});

    if(!user) {
        res.status(400).json("USER DOESN'T EXIST");
        return
    }

   

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if(!match) {
            res.status(400).json({error: "WRONG USERNAME AND PASSWORD COMBINATION"});
        } else {
            
            const accessToken = sign({username: user.username, id: user.id}, process.env.SECRET_KEY)
            //create a cookie in a browser:
            res.cookie("access-tokennn", accessToken, {
                maxAge: 60*60*24*30*1000,
                httpOnly: true, //will make our cookie not accessable to users: they cannot type in the console.log tab of a browser  somethig like: document.cookies.....               
            })
            res.json({token: accessToken, username: user.username, id: user.id})
        }
    })    

})


module.exports = router;

