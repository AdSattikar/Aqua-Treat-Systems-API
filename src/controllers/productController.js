
const products = require('../products.json');
  
  // Get all products
 exports.getAllProducts = (req, res) => {
    res.json(products);
  };
  
  