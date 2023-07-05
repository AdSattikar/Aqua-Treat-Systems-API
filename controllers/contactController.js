const ContactForm = require('../models/contactForm');

// Handle the contact form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, phoneNumber, enquiry, address } = req.body;
    
    // Create a new contact form entry
    const contactFormEntry = new ContactForm({
      name,
      phoneNumber,
      enquiry,
      address
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
      res.status(201).json(enquiries);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Delete enquiries
exports.deleteEnquiries = async (req, res) => {
  try {
    const { selectedEnquiries } = req.body;

    // Delete the selected enquiries from the database
    await ContactForm.deleteMany({ _id: { $in: selectedEnquiries } });

    // Respond with a success message
    res.status(200).json({ message: 'Enquiries deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};