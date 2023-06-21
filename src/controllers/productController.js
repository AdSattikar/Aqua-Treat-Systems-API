
const products = [
    {
      id: 1,
      name: 'Product 1',
      category: 'Category 1',
      price: 10.99,
      description: 'Description of Product 1',
      image: 'https://example.com/images/product1.jpg'
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'Category 2',
      price: 19.99,
      description: 'Description of Product 2',
      image: 'https://example.com/images/product2.jpg'
    },
    // Add more products as needed
  ];
  
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
  
  