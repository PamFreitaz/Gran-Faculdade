import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PaginaAssociacao = () => {
    const [produtos, setProdutos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState('');
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const [pRes, fRes] = await Promise.all([
                api.get('/produtos'),
                api.get('/fornecedores')
            ]);
            setProdutos(pRes.data);
            setFornecedores(fRes.data);
        } catch (error) {
            console.error('Erro ao carregar dados', error);
        }
    };

    const handleAssociar = async () => {
        if (!produtoSelecionado || !fornecedorSelecionado) return;
        try {
            await api.post('/associacoes', { produtoId: produtoSelecionado, fornecedorId: fornecedorSelecionado });
            alert('Associação criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar associação', error);
            alert('Erro ao vincular produto e fornecedor');
        }
    };

    return (
        <div>
            <h1>Gerenciar Associações</h1>
            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
                <h3>Vincular Produto a Fornecedor</h3>
                <select value={produtoSelecionado} onChange={e => setProdutoSelecionado(e.target.value)}>
                    <option value="">Selecione um Produto</option>
                    {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                </select>
                <select value={fornecedorSelecionado} onChange={e => setFornecedorSelecionado(e.target.value)}>
                    <option value="">Selecione um Fornecedor</option>
                    {fornecedores.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                </select>
                <button onClick={handleAssociar}>Associar</button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <p>Para ver as associações, consulte o banco de dados ou implemente a visualização.</p>
            </div>
        </div>
    );
};

export default PaginaAssociacao;
