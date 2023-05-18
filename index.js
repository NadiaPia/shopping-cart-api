const express = require ("express");
const app = express();
const cors = require ("cors");

//middlewares:
app.use(express.json());  //to be able to unparse the json data in the req.body
app.use(cors());

//Routers

const productsRouter = require("./routes/Products"); //where the rount handler
app.use("/products", productsRouter) //what routes to handle





app.listen (3001, () => {
    console.log("SEREVER IS RUNNING ON PORT 3001")
})


