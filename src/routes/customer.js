const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Get all customers
router.get('/dashboard/customer/display', customerController.getAllCustomers);

// Create a new customer
router.post('/dashboard/customer/insert', customerController.createCustomer);

// Update a specific customer by firstname and lastname
router.put('/dashboard/customer/update/:customerId', customerController.updateCustomerById);

// Delete a specific customer by firstname and lastname
router.delete('/dashboard/customer/delete/:customerId', customerController.deleteCustomerById);

module.exports = router;
