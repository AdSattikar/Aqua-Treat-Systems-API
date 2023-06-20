const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContactForm = mongoose.model('ContactForm', contactFormSchema);

module.exports = ContactForm;
