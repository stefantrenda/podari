
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const Donation = require('./models/donation');
const Message = require('./models/message');
const dotenv = require('dotenv');
const routes = require('./routes/routes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Configure middleware
app.use(cors());
app.use(express.json());

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dobar-sosed')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Join a room based on user ID
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });
  
  // Handle private messages
  socket.on('private-message', async (data) => {
    const { senderId, recipientId, content } = data;
    
    try {
      // Save message to database
      const message = await Message.create({
        senderId,
        recipientId, 
        content,
        read: false
      });
      
      // Send message to recipient if online
      io.to(recipientId).emit('new-message', message);
      
      // Confirm message sent to sender
      socket.emit('message-sent', message);
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('message-error', { error: 'Failed to send message' });
    }
  });
  
  // Handle mark message as read
  socket.on('mark-read', async (messageId) => {
    try {
      const message = await Message.findByIdAndUpdate(
        messageId,
        { read: true },
        { new: true }
      );
      
      if (message) {
        io.to(message.senderId).emit('message-read', messageId);
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
