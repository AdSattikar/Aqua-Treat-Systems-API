const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.getAllProducts);


router.post('/products/search',productController.searchProducts);

module.exports = router;
