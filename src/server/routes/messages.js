const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: userId },
                { recipientId: userId }
            ]
        }).sort({ createdAt: -1 });

        const conversations = {};

        messages.forEach(message => {
            const otherUserId = message.senderId === userId
                ? message.recipientId
                : message.senderId;

            if (!conversations[otherUserId]) {
                conversations[otherUserId] = {
                    userId: otherUserId,
                    messages: [],
                    unreadCount: 0
                };
            }

            conversations[otherUserId].messages.push(message);
            if (message.recipientId === userId && !message.read) {
                conversations[otherUserId].unreadCount += 1;
            }
        });

        res.json(Object.values(conversations));
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

module.exports = router;
