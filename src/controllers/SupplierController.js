const { Supplier } = require('../models/ProductSupplier');

module.exports = {
    async index(req, res) {
        try {
            const suppliers = await Supplier.findAll();
            return res.json(suppliers);
        } catch (error) {
            return res.status(500).json({ error: 'Error listing suppliers' });
        }
    },

    async store(req, res) {
        try {
            const supplier = await Supplier.create(req.body);
            return res.status(201).json(supplier);
        } catch (error) {
            return res.status(400).json({ error: 'Error creating supplier', details: error });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Supplier.update(req.body, { where: { id } });
            if (updated) {
                const updatedSupplier = await Supplier.findByPk(id);
                return res.json(updatedSupplier);
            }
            return res.status(404).json({ error: 'Supplier not found' });
        } catch (error) {
            return res.status(500).json({ error: 'Error updating supplier' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Supplier.destroy({ where: { id } });
            if (deleted) {
                return res.status(204).send();
            }
            return res.status(404).json({ error: 'Supplier not found' });
        } catch (error) {
            return res.status(500).json({ error: 'Error deleting supplier' });
        }
    }
};
