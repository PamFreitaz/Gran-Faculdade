const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Supplier = sequelize.define('Supplier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    },
    contact: {
        type: DataTypes.STRING
    }
});

module.exports = Supplier;
