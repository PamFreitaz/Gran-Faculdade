import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PaginaProduto from './pages/PaginaProduto';
import PaginaFornecedor from './pages/PaginaFornecedor';
import PaginaAssociacao from './pages/PaginaAssociacao';

function App() {
    return (
        <Router>
            <div style={{ padding: '20px', fontFamily: 'Arial' }}>
                <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <Link to="/produtos" style={{ marginRight: '10px' }}>Produtos</Link>
                    <Link to="/fornecedores" style={{ marginRight: '10px' }}>Fornecedores</Link>
                    <Link to="/associacoes">Associações</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<PaginaProduto />} />
                    <Route path="/produtos" element={<PaginaProduto />} />
                    <Route path="/fornecedores" element={<PaginaFornecedor />} />
                    <Route path="/associacoes" element={<PaginaAssociacao />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
