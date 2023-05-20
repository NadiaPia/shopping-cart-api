const express = require ("express");
const app = express();
const cors = require ("cors");

require("dotenv").config();


//middlewares:
app.use(express.json({limit: '50mb'}));  //{limit: '50mb'}) to be able to upload big images (in models add type: DataTypes.BLOB('long'),)
app.use(cors());

const db = require("./models");

//Routers

const productsRouter = require("./routes/Products"); //where the rount handler
app.use("/products", productsRouter) //what routes to handle














db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("SEREVER IS RUNNING ON PORT 3001")
    });
});
