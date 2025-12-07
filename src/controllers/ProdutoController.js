const { Produto } = require('../models/ProdutoFornecedor');

module.exports = {
    async index(req, res) {
        try {
            const produtos = await Produto.findAll();
            return res.json(produtos);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    },

    async store(req, res) {
        try {
            const produto = await Produto.create(req.body);
            return res.status(201).json(produto);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao criar produto', details: error });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [atualizado] = await Produto.update(req.body, { where: { id } });
            if (atualizado) {
                const produtoAtualizado = await Produto.findByPk(id);
                return res.json(produtoAtualizado);
            }
            return res.status(404).json({ error: 'Produto não encontrado' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletado = await Produto.destroy({ where: { id } });
            if (deletado) {
                return res.status(204).send();
            }
            return res.status(404).json({ error: 'Produto não encontrado' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
};
