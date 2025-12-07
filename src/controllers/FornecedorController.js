const { Fornecedor } = require('../models/ProdutoFornecedor');

module.exports = {
    async index(req, res) {
        try {
            const fornecedores = await Fornecedor.findAll();
            return res.json(fornecedores);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar fornecedores' });
        }
    },

    async store(req, res) {
        try {
            const fornecedor = await Fornecedor.create(req.body);
            return res.status(201).json(fornecedor);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao criar fornecedor', details: error });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [atualizado] = await Fornecedor.update(req.body, { where: { id } });
            if (atualizado) {
                const fornecedorAtualizado = await Fornecedor.findByPk(id);
                return res.json(fornecedorAtualizado);
            }
            return res.status(404).json({ error: 'Fornecedor não encontrado' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletado = await Fornecedor.destroy({ where: { id } });
            if (deletado) {
                return res.status(204).send();
            }
            return res.status(404).json({ error: 'Fornecedor não encontrado' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar fornecedor' });
        }
    }
};
