
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String
  },
  condition: {
    type: String,
    enum: ['Ново', 'Како ново', 'Добра', 'Користено', 'Лошо'],
    default: 'Користено'
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create text indexes for search
donationSchema.index({ title: 'text', description: 'text' });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
