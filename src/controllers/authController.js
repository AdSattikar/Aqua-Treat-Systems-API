const { validationResult } = require('express-validator');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Authenticate an admin
exports.loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: 'Please try to login with correct credentials' });
    }

    const passwordCompare = await bcrypt.compare(password, admin.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: 'Please try to login with correct credentials' });
    }

    const data = {
      admin: {
        id: admin.id
      }
    };
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Get authenticated admin
exports.getAuthAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.send(admin);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};
