
const products = require('../products.json');
  
  // Get all products
 exports.getAllProducts = (req, res) => {
    res.json(products);
  };
  
  // Search products based on query and category
  exports.searchProducts = (req, res) => {
    const { query, category } = req.query;
  
    // Perform search based on query and category
    // Return matching products as response
  
    const filteredProducts = products.filter((product) => {
      const productNameMatch = product.name.toLowerCase().includes(query.toLowerCase());
      const productCategoryMatch = product.category.toLowerCase() === category.toLowerCase();
  
      return productNameMatch && productCategoryMatch;
    });
  
    res.json(filteredProducts);
  };
  
  