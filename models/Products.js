const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        image: {
            type: DataTypes.BLOB('long'),
            allowNull: false,           
        },        
    })
    return Products;
}