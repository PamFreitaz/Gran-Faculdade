import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AssociationPage = () => {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [associations, setAssociations] = useState([]); // This would ideally be fetched differently, but for simplicity we show potential links

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [pRes, sRes] = await Promise.all([
                api.get('/products'),
                api.get('/suppliers')
            ]);
            setProducts(pRes.data);
            setSuppliers(sRes.data);
        } catch (error) {
            console.error('Error loading data', error);
        }
    };

    const handleAssociate = async () => {
        if (!selectedProduct || !selectedSupplier) return;
        try {
            await api.post('/associations', { productId: selectedProduct, supplierId: selectedSupplier });
            alert('Association created successfully!');
            // You might want to refresh a list of associations here if implemented
        } catch (error) {
            console.error('Error creating association', error);
            alert('Error linking product and supplier');
        }
    };

    return (
        <div>
            <h1>Manage Associations</h1>
            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
                <h3>Link Product to Supplier</h3>
                <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
                    <option value="">Select Product</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <select value={selectedSupplier} onChange={e => setSelectedSupplier(e.target.value)}>
                    <option value="">Select Supplier</option>
                    {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <button onClick={handleAssociate}>Associate</button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <p>To view associations, please check database or inspect API responses for now as UI for listing all associations was not explicitly detailed but implied via logic.</p>
                {/* 
                   Ideally we would show a list of products and their suppliers here.
                   We can implement a view to show suppliers for a selected product.
                */}
            </div>
        </div>
    );
};

export default AssociationPage;
