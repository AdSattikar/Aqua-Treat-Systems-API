const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Handle the contact form submission
router.post('/contact', contactController.submitContactForm);

// Fetch all enquiries
router.get('/dashboard/customer/enquiry', contactController.getAllEnquiries);

router.delete('/dashboard/customer/enquiry', contactController.deleteEnquiries);

module.exports = router;