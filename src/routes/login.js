// ROUTE 2: Authenticate a Admin using: POST "/login".
const express = require('express');
const Admin = require('../models/admin')
const router = express.Router();
var fetchadmin = require('../middleware/fetchadmin')

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

require('dotenv').config();
var jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;


router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let admin = await Admin.findOne({ email });
        if (!admin) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, admin.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            admin:{
              id: admin.id
            }
          }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/getauthadmin', fetchadmin,  async (req, res) => {

    try {
      let adminId = req.admin.id;
      const admin = await Admin.findById(adminId).select("-password")
      res.send(admin)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
