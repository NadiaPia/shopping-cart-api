const express = require ("express");
const app = express();
const cors = require ("cors");
const cookieParser = require("cookie-parser");


const db = require("./models");

require("dotenv").config();


//middlewares:

app.use(express.json());
app.use(cookieParser());  //every request will have this middleware applying 

app.use(express.json({limit: '50mb'}));  //{limit: '50mb'}) to be able to upload big images (in models add type: DataTypes.BLOB('long'),)
app.use(cors());



//Routers

const productsRouter = require("./routes/Products"); //where the rount handler
app.use("/products", productsRouter) //what routes to handle

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter)












db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("SEREVER IS RUNNING ON PORT 3001")
    });
});
