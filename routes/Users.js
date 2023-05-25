const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");


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
            // one way 

            
            const accessToken = sign({username: user.username, id: user.id}, process.env.SECRET_KEY)
            //create a cookie in a browser:
            res.cookie("access-tokennn", accessToken, {
                maxAge: 60*60*24*30*1000,
                httpOnly: true, //will make our cookie not accessable to users: they cannot type in the console.log tab of a browser  somethig like: document.cookies.....               
            })
            res.json({token: accessToken, username: user.username, id: user.id})
            

            /*another way*/
            //--------------if I need use express-session instead of JWT------------------

            /*

            req.session.user = user; //we create a session that containes the cookie. session.user means the name of the session is "user"
            console.log("req.session.userreq.session.userreq.session.user", req.session.user)
            res.json(user);
            */
           //--------------------------------------------------------------------------------------------
        }
    });    

});

/*router.get("/login", async(req, res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})*/


router.get("/login", async(req, res) => {
    console.log("////////////////////req////////////////////////////////", req.cookies)

})


module.exports = router;

