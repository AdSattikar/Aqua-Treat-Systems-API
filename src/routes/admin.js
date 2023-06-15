const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');

// Get all admins
router.get('/admins', adminController.getAllAdmins);

// Create a new admin
router.post(
  '/admins',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  adminController.createAdmin
);

// Update an admin by ID
router.put(
  '/admin/:id',
  [
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  adminController.updateAdminById
);

// Delete an admin by ID
router.delete('/admin/:id', adminController.deleteAdminById);

module.exports = router;
