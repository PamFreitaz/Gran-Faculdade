const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    barcode: {
        type: DataTypes.STRING,
        unique: true
    }
});

module.exports = Product;
