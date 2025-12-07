const { DataTypes } = require('sequelize');
const sequelize = require('../database/index');
const Product = require('./Product');
const Supplier = require('./Supplier');

const ProductSupplier = sequelize.define('ProductSupplier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

Product.belongsToMany(Supplier, { through: ProductSupplier });
Supplier.belongsToMany(Product, { through: ProductSupplier });

module.exports = { Product, Supplier, ProductSupplier };
