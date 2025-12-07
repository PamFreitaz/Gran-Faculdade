const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
const Produto = require('./Produto');
const Fornecedor = require('./Fornecedor');

const ProdutoFornecedor = sequelize.define('ProdutoFornecedor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

Produto.belongsToMany(Fornecedor, { through: ProdutoFornecedor });
Fornecedor.belongsToMany(Produto, { through: ProdutoFornecedor });

module.exports = { Produto, Fornecedor, ProdutoFornecedor };
