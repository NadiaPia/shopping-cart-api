const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Users.associate = (models) => {
        Users.hasMany(models.Cart, {
            onDelete: "cascade",  //if we delete a user, it disappear in cart
        });
    };
    //That meens in the Cart table will appear one more column UserID

    return Users;
}