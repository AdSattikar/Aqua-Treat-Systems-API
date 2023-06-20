const ContactForm = require('../models/contactForm');

// Handle the contact form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, phoneNumber, subject, message } = req.body;
    
    // Create a new contact form entry
    const contactFormEntry = new ContactForm({
      name,
      phoneNumber,
      subject,
      message
    });

    // Save the contact form entry to the database
    await contactFormEntry.save();

    // Respond with a success message
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all customers
exports.getAllEnquiries = async (req, res) => {
    try {
      const enquiries = await ContactForm.find();
      res.status(200).json(enquiries);
      console.log(enquiries)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

