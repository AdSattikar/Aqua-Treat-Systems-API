const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Get all customers
router.get('/customers', customerController.getAllCustomers);

// Get a specific customer by firstname and lastname
router.get('/customers/:firstname/:lastname', customerController.getCustomerByName);

// Create a new customer
router.post('/customers', customerController.createCustomer);

// Update a specific customer by firstname and lastname
router.put('/customers/:firstname/:lastname', customerController.updateCustomerByName);

// Delete a specific customer by firstname and lastname
router.delete('/customers/:firstname/:lastname', customerController.deleteCustomerByName);

module.exports = router;
