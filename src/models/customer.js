const mongoose = require('mongoose');
const validate = require('mongoose-validator');

// Custom validation function for name field
const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
];

const customerSchema = new mongoose.Schema({
  customerId:{
    type: String,
    required:[true,'Please provide a customerId']
  },
  firstname: {
    type: String,
    required: [true, 'Please provide a name'],
    validate: nameValidator,
  },
  lastname: {
    type: String,
    required: [true, 'Please provide a name'],
    validate: nameValidator,
  },
  waterpurifier: {
    type: String,
    required: [true, 'Please provide a water purifier name'],
  },
  waterpurifier_type: {
    type: String,
    required: [true, 'Please provide a water purifier type'],
  },
  cost: {
    type: Number,
    required: [true, 'Please provide a cost'],
    min: [0, 'Cost must be a positive number'],
  },
  date_of_installation: {
    type: Date,
    required: [true, 'Please provide a date of installation'],
    validate: {
      validator: (value) => {
        return value instanceof Date && !isNaN(value);
      },
      message: 'Please provide a valid date of installation',
    },
  },
  date_last_service: {
    type: Date,
    required: [true, 'Please provide a date of last service'],
    validate: {
      validator: (value) => {
        return value instanceof Date && !isNaN(value);
      },
      message: 'Please provide a valid date of last service',
    },
  },
  nextservicedue: {
    type: Date,
    required: [true, 'Please provide a date for next service'],
    validate: {
      validator: (value) => {
        return value instanceof Date && !isNaN(value);
      },
      message: 'Please provide a valid date for next service',
    },
  },
  contact: {
    type: String,
    required: [true, 'Please provide a contact number'],
    validate: {
      validator: (value) => {
        return /\d{10}/.test(value);
      },
      message: 'Please provide a valid 10-digit contact number',
    },
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
