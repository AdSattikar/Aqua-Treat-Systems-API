const { validationResult } = require('express-validator');
const Customer = require('../models/customer');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific customer by customerId
exports.getCustomerByName = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
  const {
    customerId,
    firstname,
    lastname,
    waterpurifier,
    waterpurifier_type,
    cost,
    date_of_installation,
    date_last_service,
    contact,
    address,
  } = req.body;

 const installationdate = new Date(date_of_installation).toLocaleDateString();
  const last_service = new Date(date_last_service).toLocaleDateString();
  let nextServiceDue = new Date(date_last_service);
  nextServiceDue.setDate(nextServiceDue.getDate() + 365);

  try {
    const customer = new Customer({
      customerId,
      firstname,
      lastname,
      waterpurifier,
      waterpurifier_type,
      cost,
      date_of_installation:installationdate,
      date_last_service:last_service,
      nextservicedue: nextServiceDue,
      contact,
      address,
    });
    // Check if Customer with the same customerId already exists
    const existingCustomer = await Customer.findOne({ customerId });
    if (existingCustomer) {
      return res.status(409).json({ error: 'Customer already exists' });
    }
    else{
    const savedCustomer = await customer.save();
    
    res.status(201).json(savedCustomer);
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

// Update a specific customer by customerId
exports.updateCustomerById = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findOne({ customerId });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Update the fields in the customer object based on the provided values in req.body
    Object.keys(req.body).forEach((key) => {
      if (req.body[key]) {
        customer[key] = req.body[key];
      }
    });

    const updatedCustomer = await customer.save();

    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};



// Delete a specific customer by customerId
exports.deleteCustomerById = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findOneAndRemove({ customerId });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
