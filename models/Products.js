const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        image: {
            type: DataTypes.STRING,
            allowNull: false,   
        },        
    })
    return Products;
}