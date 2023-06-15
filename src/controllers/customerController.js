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

// Get a specific customer by firstname and lastname
exports.getCustomerByName = async (req, res) => {
  const { firstname, lastname } = req.params;

  try {
    const customer = await Customer.findOne({ firstname, lastname });
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
    firstname,
    lastname,
    waterpurifier,
    waterpurifier_type,
    cost,
    date_of_installation,
    contact,
    address,
  } = req.body;

  const currentDate = new Date();
  const lastServiceDate = new Date(date_of_installation);
  lastServiceDate.setFullYear(lastServiceDate.getFullYear() - 1);
  const nextServiceDue = new Date(lastServiceDate);
  nextServiceDue.setDate(nextServiceDue.getDate() + 365);

  try {
    const customer = new Customer({
      firstname,
      lastname,
      waterpurifier,
      waterpurifier_type,
      cost,
      date_of_installation,
      date_last_service: lastServiceDate,
      nextservicedue: nextServiceDue,
      contact,
      address,
    });

    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

// Update a specific customer by firstname and lastname
exports.updateCustomerByName = async (req, res) => {
  const { firstname, lastname } = req.params;

  try {
    const customer = await Customer.findOneAndUpdate(
      { firstname, lastname },
      req.body,
      { new: true }
    );
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

// Delete a specific customer by firstname and lastname
exports.deleteCustomerByName = async (req, res) => {
  const { firstname, lastname } = req.params;

  try {
    const customer = await Customer.findOneAndRemove({ firstname, lastname });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
