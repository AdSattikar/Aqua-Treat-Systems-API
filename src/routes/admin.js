const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Admin = require('../models/admin');

const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken')

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Get all admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Create a new admin
router.post('/admins', async (req, res) => {
  const {username,email,password } = req.body;
  try {
    // Check if admin with the same username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({ error: 'Admin already exists' });
    }
   
    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new admin
    const admin = new Admin({ username,email,password: hashedPassword });
    
    const savedAdmin = await admin.save();

    const data = {
      admin:{
        id: admin.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET)

    // res.status(201).json(savedAdmin);
    res.status(201).json({authToken})
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Update an admin by ID
router.put('/admin/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email ,password} = req.body;
  
    try {
      const updatedFields = {};
  
      // Update the admin's username if provided
      if (username) {
        updatedFields.username = username;
      }
  
       // Update the admin's email if provided
       if (email) {
        updatedFields.email = email;
      }
  
      // Update the admin's password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        updatedFields.password = hashedPassword;
      }
  
      const updatedAdmin = await Admin.findOneAndUpdate(
        { _id: id },
        updatedFields,
        { new: true }
      );
  
      if (!updatedAdmin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      res.json(updatedAdmin);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  });
  

// Delete an admin by ID
router.delete('/admin/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByIdAndRemove(id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
