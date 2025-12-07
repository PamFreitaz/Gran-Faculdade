const { Product, Supplier } = require('../models/ProductSupplier');

module.exports = {
    async store(req, res) {
        try {
            const { productId, supplierId } = req.body;
            const product = await Product.findByPk(productId);
            const supplier = await Supplier.findByPk(supplierId);

            if (!product || !supplier) {
                return res.status(404).json({ error: 'Product or Supplier not found' });
            }

            await product.addSupplier(supplier);
            return res.status(201).json({ message: 'Association created' });
        } catch (error) {
            return res.status(500).json({ error: 'Error creating association' });
        }
    },

    async getSuppliersByProduct(req, res) {
        try {
            const { productId } = req.params;
            const product = await Product.findByPk(productId, {
                include: Supplier
            });

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.json(product.Suppliers);
        } catch (error) {
            return res.status(500).json({ error: 'Error identifying suppliers' });
        }
    },

    async getProductsBySupplier(req, res) {
        try {
            const { supplierId } = req.params;
            const supplier = await Supplier.findByPk(supplierId, {
                include: Product
            });

            if (!supplier) {
                return res.status(404).json({ error: 'Supplier not found' });
            }

            return res.json(supplier.Products);
        } catch (error) {
            return res.status(500).json({ error: 'Error identifying products' });
        }
    },

    async delete(req, res) {
        try {
            const { productId, supplierId } = req.body;
            const product = await Product.findByPk(productId);
            const supplier = await Supplier.findByPk(supplierId);

            if (!product || !supplier) {
                return res.status(404).json({ error: 'Product or Supplier not found' });
            }

            await product.removeSupplier(supplier);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Error deleting association' });
        }
    }
};
