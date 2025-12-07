const { Product } = require('../models/ProductSupplier');

module.exports = {
    async index(req, res) {
        try {
            const products = await Product.findAll();
            return res.json(products);
        } catch (error) {
            return res.status(500).json({ error: 'Error listing products' });
        }
    },

    async store(req, res) {
        try {
            const product = await Product.create(req.body);
            return res.status(201).json(product);
        } catch (error) {
            return res.status(400).json({ error: 'Error creating product', details: error });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Product.update(req.body, { where: { id } });
            if (updated) {
                const updatedProduct = await Product.findByPk(id);
                return res.json(updatedProduct);
            }
            return res.status(404).json({ error: 'Product not found' });
        } catch (error) {
            return res.status(500).json({ error: 'Error updating product' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Product.destroy({ where: { id } });
            if (deleted) {
                return res.status(204).send();
            }
            return res.status(404).json({ error: 'Product not found' });
        } catch (error) {
            return res.status(500).json({ error: 'Error deleting product' });
        }
    }
};
