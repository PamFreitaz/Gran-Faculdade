import React, { useState, useEffect } from 'react';
import api from '../services/api';

const SupplierPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [form, setForm] = useState({ name: '', cnpj: '', address: '', contact: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        try {
            const response = await api.get('/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error loading suppliers', error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/suppliers/${editingId}`, form);
            } else {
                await api.post('/suppliers', form);
            }
            setForm({ name: '', cnpj: '', address: '', contact: '' });
            setEditingId(null);
            loadSuppliers();
        } catch (error) {
            console.error('Error saving supplier', error);
            alert('Error saving supplier');
        }
    };

    const handleEdit = (supplier) => {
        setForm({ name: supplier.name, cnpj: supplier.cnpj, address: supplier.address, contact: supplier.contact });
        setEditingId(supplier.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/suppliers/${id}`);
                loadSuppliers();
            } catch (error) {
                console.error('Error deleting supplier', error);
            }
        }
    };

    return (
        <div>
            <h1>Suppliers</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
                <h3>{editingId ? 'Edit Supplier' : 'New Supplier'}</h3>
                <div>
                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                    <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required />
                </div>
                <div>
                    <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                    <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
                </div>
                <button type="submit">{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', cnpj: '', address: '', contact: '' }); }}>Cancel</button>}
            </form>

            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>CNPJ</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(s => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.cnpj}</td>
                            <td>
                                <button onClick={() => handleEdit(s)}>Edit</button>
                                <button onClick={() => handleDelete(s.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupplierPage;
