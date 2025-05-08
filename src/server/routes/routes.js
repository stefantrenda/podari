const express = require('express');
const authRoutes = require('./auth');
const donationRoutes = require('./donations');
const messageRoutes = require('./messages');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/donations', donationRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
