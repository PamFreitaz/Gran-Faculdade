const express = require('express');
const routes = express.Router();

const ProdutoController = require('./controllers/ProdutoController');
const FornecedorController = require('./controllers/FornecedorController');
const AssociacaoController = require('./controllers/AssociacaoController');

routes.get('/', (req, res) => {
    res.send('API rodando');
});

// Rotas de Produto
routes.post('/produtos', ProdutoController.store);
routes.get('/produtos', ProdutoController.index);
routes.put('/produtos/:id', ProdutoController.update);
routes.delete('/produtos/:id', ProdutoController.delete);

// Rotas de Fornecedor
routes.post('/fornecedores', FornecedorController.store);
routes.get('/fornecedores', FornecedorController.index);
routes.put('/fornecedores/:id', FornecedorController.update);
routes.delete('/fornecedores/:id', FornecedorController.delete);

// Rotas de Associação
routes.post('/associacoes', AssociacaoController.store);
routes.get('/associacoes/produtos/:produtoId', AssociacaoController.getFornecedoresByProduto);
routes.get('/associacoes/fornecedores/:fornecedorId', AssociacaoController.getProdutosByFornecedor);
routes.delete('/associacoes', AssociacaoController.delete);

module.exports = routes;
