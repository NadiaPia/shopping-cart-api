const express = require ("express");
const app = express();
const cors = require ("cors");
const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser"); //--------------if I need use express-session instead of JWT------------------
//const session = require("express-session");//--------------if I need use express-session instead of JWT------------------
const PORT = process.env.PORT || 3001;

const db = require("./models");

require("dotenv").config();


//middlewares:

app.use(express.json());
app.use(cookieParser());  //every request will have this middleware applying 
//app.use(bodyParser.urlencoded({extended: true})); //--------------if I need use express-session instead of JWT------------------

app.use(express.json({limit: '50mb'}));  //{limit: '50mb'}) to be able to upload big images (in models add type: DataTypes.BLOB('long'),)
app.use(cors({     //cookie
    //origin: "*",
    origin: [
        "http://localhost:3000", 
        "http://localhost:3002", 
        "http://192.168.0.176:3002", 
        //"https://shopping-hunter.web.app/", 
        "https://shopping-hunter.web.app"
    ],
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








db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`SEREVER IS RUNNING ON PORT ${PORT}`)
    });
});
