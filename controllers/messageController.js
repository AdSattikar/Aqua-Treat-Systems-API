require('dotenv').config();



const twilio = require('twilio');

// Function to send messages to selected customers
exports.sendMessages = async (req, res) => {
  try {
    const { selectedCustomers } = req.body;

   // Twilio account credentials
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    // Loop through selected customers and send messages
    for (const customer of selectedCustomers) {
      const { contact, firstname, lastname } = customer;
      const message = `Hello ${firstname} ${lastname}, this is a message from Aqua Treat Systems.`;
      
      // Send SMS message using Twilio
      await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE,
        to: "+91"+contact,
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending messages:', error);
    res.sendStatus(500);
  }
};


