const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//const session = require("express-session");
const { validateToken } = require("../middlewares/AuthMiddlewares")



//    "/auth" = "/";

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then(async (hash) => {
        const userReg = await Users.create({
            username: username,
            password: hash,
        })
        console.log("userRegggggggggggg", userReg.id) //id: 9, username: Alisa, password:$2b$10....JgpKmomdbnzVy'
        //res.json("------------USER IS SET UP TO THE DB---------------")

        const accessToken = sign({ username: userReg.username, id: userReg.id }, process.env.SECRET_KEY)
            //create a cookie in a browser:
            res.cookie("access-tokennn", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true, //will make our cookie not accessable to users: they cannot type in the console.log tab of a browser  somethig like: document.cookies.....               
            })
            res.json({ token: accessToken, username: userReg.username, id: userReg.id })
    }).catch((err) => {
        if (err) {
            res.status(400).json({ error: err });
        }
    })
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        res.status(400).json("USER DOESN'T EXIST");
        return
    }

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400).json({ error: "WRONG USERNAME AND PASSWORD COMBINATION" });
        } else {
            // one way 


            const accessToken = sign({ username: user.username, id: user.id }, process.env.SECRET_KEY)
            //create a cookie in a browser:
            res.cookie("access-tokennn", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true, //will make our cookie not accessable to users: they cannot type in the console.log tab of a browser  somethig like: document.cookies.....               
            })
            res.json({ token: accessToken, username: user.username, id: user.id })


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

//--------------if I need use express-session instead of JWT------------------
/*router.get("/login", async(req, res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})*/
//-------------------------------------------------------------------------------

/*router.get("/login", async (req, res) => {
    if(!req.cookies['access-tokennn']) {
        res.status(401).json({error: "user is not logged in"});
    } else {
        console.log("if(req.cookies['access-tokennn'])", res)
        res.json("user is logged in")
    }
    //console.log("////////////////////req.cookies.access-tokennn////////////////////////////////", req.cookies['access-tokennn'])

}); */

router.get("/login", validateToken, (req, res) => {
    res.json(req.user);
    //console.log("req.user", req.user)
})

router.get("/logout", async(req, res) => {
    //console.log("req.cookies", req.cookies) //'access-tokennn': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhdmVsIiwi.....'
    res.clearCookie("access-tokennn");
    res.status(200).json({
        status: 'success',
        message: 'Logged out...'
    });
    
})


module.exports = router;

