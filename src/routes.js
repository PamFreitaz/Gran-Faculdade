const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const SupplierController = require('./controllers/SupplierController');
const AssociationController = require('./controllers/AssociationController');

routes.get('/', (req, res) => {
    res.send('API is running');
});

// Product Routes
routes.post('/products', ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

// Supplier Routes
routes.post('/suppliers', SupplierController.store);
routes.get('/suppliers', SupplierController.index);
routes.put('/suppliers/:id', SupplierController.update);
routes.delete('/suppliers/:id', SupplierController.delete);

// Association Routes
routes.post('/associations', AssociationController.store);
routes.get('/associations/products/:productId', AssociationController.getSuppliersByProduct);
routes.get('/associations/suppliers/:supplierId', AssociationController.getProductsBySupplier);
routes.delete('/associations', AssociationController.delete);

module.exports = routes;
