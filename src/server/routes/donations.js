const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');
const auth = require('../middleware/auth');

// Get all donations with optional filters and pagination
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const skip = (page - 1) * limit;
        const query = {};

        if (req.query.city) query.city = req.query.city;
        if (req.query.category) query.category = req.query.category;
        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        const total = await Donation.countDocuments(query);
        const donations = await Donation.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            donations,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ error: 'Failed to fetch donations' });
    }
});

// Get single donation by ID
router.get('/:id', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ error: 'Donation not found' });
        res.json(donation);
    } catch (error) {
        console.error('Error fetching donation:', error);
        res.status(500).json({ error: 'Failed to fetch donation' });
    }
});

// Create a new donation
router.post('/', auth, async (req, res) => {
    try {
        const donation = await Donation.create({
            ...req.body,
            userId: req.user._id
        });
        res.status(201).json(donation);
    } catch (error) {
        console.error('Error creating donation:', error);
        res.status(500).json({ error: 'Failed to create donation' });
    }
});

module.exports = router;
