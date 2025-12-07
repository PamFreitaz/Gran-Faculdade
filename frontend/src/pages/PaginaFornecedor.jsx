import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PaginaFornecedor = () => {
    const [fornecedores, setFornecedores] = useState([]);
    const [form, setForm] = useState({ nome: '', cnpj: '', endereco: '', contato: '' });
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        carregarFornecedores();
    }, []);

    const carregarFornecedores = async () => {
        try {
            const response = await api.get('/fornecedores');
            setFornecedores(response.data);
        } catch (error) {
            console.error('Erro ao carregar fornecedores', error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editandoId) {
                await api.put(`/fornecedores/${editandoId}`, form);
            } else {
                await api.post('/fornecedores', form);
            }
            setForm({ nome: '', cnpj: '', endereco: '', contato: '' });
            setEditandoId(null);
            carregarFornecedores();
        } catch (error) {
            console.error('Erro ao salvar fornecedor', error);
            alert('Erro ao salvar fornecedor');
        }
    };

    const handleEdit = (fornecedor) => {
        setForm({ nome: fornecedor.nome, cnpj: fornecedor.cnpj, endereco: fornecedor.endereco, contato: fornecedor.contato });
        setEditandoId(fornecedor.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza?')) {
            try {
                await api.delete(`/fornecedores/${id}`);
                carregarFornecedores();
            } catch (error) {
                console.error('Erro ao deletar fornecedor', error);
            }
        }
    };

    return (
        <div>
            <h1>Fornecedores</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
                <h3>{editandoId ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h3>
                <div>
                    <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
                    <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required />
                </div>
                <div>
                    <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} />
                    <input name="contato" placeholder="Contato" value={form.contato} onChange={handleChange} />
                </div>
                <button type="submit">{editandoId ? 'Atualizar' : 'Criar'}</button>
                {editandoId && <button type="button" onClick={() => { setEditandoId(null); setForm({ nome: '', cnpj: '', endereco: '', contato: '' }); }}>Cancelar</button>}
            </form>

            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {fornecedores.map(f => (
                        <tr key={f.id}>
                            <td>{f.id}</td>
                            <td>{f.nome}</td>
                            <td>{f.cnpj}</td>
                            <td>
                                <button onClick={() => handleEdit(f)}>Editar</button>
                                <button onClick={() => handleDelete(f.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaginaFornecedor;
