const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Get all customers
router.get('/dashboard/customer/display', customerController.getAllCustomers);

// Get a specific customer by firstname and lastname
router.get('/customer/get/:firstname/:lastname', customerController.getCustomerByName);

// Create a new customer
router.post('/dashboard/customer/insert', customerController.createCustomer);

// Update a specific customer by firstname and lastname
router.put('/dashboard/customer/update/:firstname/:lastname', customerController.updateCustomerByName);

// Delete a specific customer by firstname and lastname
router.delete('/dashboard/customer/delete/:firstname/:lastname', customerController.deleteCustomerByName);

module.exports = router;
