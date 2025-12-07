import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import SupplierPage from './pages/SupplierPage';
import AssociationPage from './pages/AssociationPage';

function App() {
    return (
        <Router>
            <div style={{ padding: '20px', fontFamily: 'Arial' }}>
                <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <Link to="/" style={{ marginRight: '10px' }}>Products</Link>
                    <Link to="/suppliers" style={{ marginRight: '10px' }}>Suppliers</Link>
                    <Link to="/associations">Associations</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<ProductPage />} />
                    <Route path="/suppliers" element={<SupplierPage />} />
                    <Route path="/associations" element={<AssociationPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
