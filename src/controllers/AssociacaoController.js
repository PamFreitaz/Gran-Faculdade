const { Produto, Fornecedor } = require('../models/ProdutoFornecedor');

module.exports = {
    async store(req, res) {
        try {
            const { produtoId, fornecedorId } = req.body;
            const produto = await Produto.findByPk(produtoId);
            const fornecedor = await Fornecedor.findByPk(fornecedorId);

            if (!produto || !fornecedor) {
                return res.status(404).json({ error: 'Produto ou Fornecedor não encontrado' });
            }

            await produto.addFornecedor(fornecedor);
            return res.status(201).json({ message: 'Associação criada com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar associação' });
        }
    },

    async getFornecedoresByProduto(req, res) {
        try {
            const { produtoId } = req.params;
            const produto = await Produto.findByPk(produtoId, {
                include: Fornecedor
            });

            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            return res.json(produto.Fornecedors); // Sequelize pluralization might need check, usually adds 's'
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar fornecedores' });
        }
    },

    async getProdutosByFornecedor(req, res) {
        try {
            const { fornecedorId } = req.params;
            const fornecedor = await Fornecedor.findByPk(fornecedorId, {
                include: Produto
            });

            if (!fornecedor) {
                return res.status(404).json({ error: 'Fornecedor não encontrado' });
            }

            return res.json(fornecedor.Produtos);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    },

    async delete(req, res) {
        try {
            const { produtoId, fornecedorId } = req.body;
            const produto = await Produto.findByPk(produtoId);
            const fornecedor = await Fornecedor.findByPk(fornecedorId);

            if (!produto || !fornecedor) {
                return res.status(404).json({ error: 'Produto ou Fornecedor não encontrado' });
            }

            await produto.removeFornecedor(fornecedor);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar associação' });
        }
    }
};
