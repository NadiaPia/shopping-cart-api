const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        publicId: {
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

    Products.associate = (models) => {
        Products.hasMany(models.Cart);
    };
    //That meens in the Cart table will appear one more column ProductsID


    return Products;
}