import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', price: '', barcode: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error loading products', error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/products/${editingId}`, form);
            } else {
                await api.post('/products', form);
            }
            setForm({ name: '', description: '', price: '', barcode: '' });
            setEditingId(null);
            loadProducts();
        } catch (error) {
            console.error('Error saving product', error);
            alert('Error saving product');
        }
    };

    const handleEdit = (product) => {
        setForm({ name: product.name, description: product.description, price: product.price, barcode: product.barcode });
        setEditingId(product.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/products/${id}`);
                loadProducts();
            } catch (error) {
                console.error('Error deleting product', error);
            }
        }
    };

    return (
        <div>
            <h1>Products</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
                <h3>{editingId ? 'Edit Product' : 'New Product'}</h3>
                <div>
                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                    <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                </div>
                <div>
                    <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required step="0.01" />
                    <input name="barcode" placeholder="Barcode" value={form.barcode} onChange={handleChange} />
                </div>
                <button type="submit">{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '', price: '', barcode: '' }); }}>Cancel</button>}
            </form>

            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>
                                <button onClick={() => handleEdit(p)}>Edit</button>
                                <button onClick={() => handleDelete(p.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductPage;
