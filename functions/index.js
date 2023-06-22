/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onCall} = require("firebase-functions/v2/https");
const {onDocumentWritten} = require("firebase-functions/v2/firestore");

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require ("express");
const app = express();
const cors = require ("cors");
const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser"); //--------------if I need use express-session instead of JWT------------------
//const session = require("express-session");//--------------if I need use express-session instead of JWT------------------


const db = require("./models");

require("dotenv").config();


//middlewares:

app.use(express.json());
app.use(cookieParser());  //every request will have this middleware applying 
//app.use(bodyParser.urlencoded({extended: true})); //--------------if I need use express-session instead of JWT------------------

app.use(express.json({limit: '50mb'}));  //{limit: '50mb'}) to be able to upload big images (in models add type: DataTypes.BLOB('long'),)
app.use(cors({     //cookie
    origin: ["http://localhost:3002", "http://192.168.0.176:3002", "https://shopping-hunter.web.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


  //--------------if I need use express-session instead of JWT------------------
  /*
app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        cookie: {
            expires: 60*60*24,
        },
    })
);*/
//--------------------------------------------------------------------------------


//Routers

const productsRouter = require("./routes/Products"); //where the rount handler
app.use("/products", productsRouter) //what routes to handle

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const cartsRouter = require("./routes/Carts");
app.use("/carts", cartsRouter);

const profileRouter = require("./routes/Profile");
app.use("/profile", profileRouter)

const paymentRouter = require("./routes/Payment");
app.use("/payment", paymentRouter)



app.get("/test", (req, res) => {
    res.json('VSE HOROSHO!')
})




// db.sequelize.sync().then(() => {
//     app.listen(3001, () => {
//         console.log("SEREVER IS RUNNING ON PORT 3001")
//     });
// });

exports.app = functions.https.onRequest(app);