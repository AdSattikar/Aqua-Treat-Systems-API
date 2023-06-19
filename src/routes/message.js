const express = require('express');

const messageController = require('../controllers/messageController');

const router = express.Router();

router.post('/send-messages', messageController.sendMessages);

module.exports = router