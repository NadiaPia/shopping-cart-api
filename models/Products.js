const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },  
    })
    return Products;
}