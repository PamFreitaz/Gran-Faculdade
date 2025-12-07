import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PaginaProduto = () => {
    const [produtos, setProdutos] = useState([]);
    const [form, setForm] = useState({ nome: '', descricao: '', preco: '', codigoBarras: '' });
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        try {
            const response = await api.get('/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao carregar produtos', error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoId) {
                await api.put(`/produtos/${editandoId}`, form);
            } else {
                await api.post('/produtos', form);
            }
            setForm({ nome: '', descricao: '', preco: '', codigoBarras: '' });
            setEditandoId(null);
            carregarProdutos();
        } catch (error) {
            console.error('Erro ao salvar produto', error);
            alert('Erro ao salvar produto');
        }
    };

    const handleEdit = (produto) => {
        setForm({ nome: produto.nome, descricao: produto.descricao, preco: produto.preco, codigoBarras: produto.codigoBarras });
        setEditandoId(produto.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza?')) {
            try {
                await api.delete(`/produtos/${id}`);
                carregarProdutos();
            } catch (error) {
                console.error('Erro ao deletar produto', error);
            }
        }
    };

    return (
        <div>
            <h1>Produtos</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
                <h3>{editandoId ? 'Editar Produto' : 'Novo Produto'}</h3>
                <div>
                    <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
                    <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
                </div>
                <div>
                    <input name="preco" type="number" placeholder="Preço" value={form.preco} onChange={handleChange} required step="0.01" />
                    <input name="codigoBarras" placeholder="Código de Barras" value={form.codigoBarras} onChange={handleChange} />
                </div>
                <button type="submit">{editandoId ? 'Atualizar' : 'Criar'}</button>
                {editandoId && <button type="button" onClick={() => { setEditandoId(null); setForm({ nome: '', descricao: '', preco: '', codigoBarras: '' }); }}>Cancelar</button>}
            </form>

            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nome}</td>
                            <td>{p.preco}</td>
                            <td>
                                <button onClick={() => handleEdit(p)}>Editar</button>
                                <button onClick={() => handleDelete(p.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaginaProduto;
