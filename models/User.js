const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contactNo: { // Add contactNo field
    type: String,
    required: true
  },
  collegeName: { // Add collegeName field
    type: String,
    required: true
  },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
