const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })

    Cart.associate = (models) => {
        Cart.belongsTo(models.Products, {
            foreignKey: 'ProductId',
            onDelete: "cascade",  //if we delete a product, it disappear in cart
            
        });
    };

   /* Cart.associate = (models) => {
        Cart.belongsTo(models.Users, {
            foreignKey: 'UserId'
        });
    };*/

    return Cart;
} 