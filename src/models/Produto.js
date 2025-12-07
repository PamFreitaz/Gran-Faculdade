const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    codigoBarras: {
        type: DataTypes.STRING,
        unique: true
    }
});

module.exports = Produto;
