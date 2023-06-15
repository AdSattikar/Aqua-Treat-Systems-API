const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/authController');
const fetchAdmin = require('../middleware/fetchAdmin');

const router = express.Router();

// Authenticate an admin
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],
  adminController.loginAdmin
);

// Get authenticated admin
router.post('/getauthadmin', fetchAdmin, adminController.getAuthAdmin);

module.exports = router;
