const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    slotTimings: {
      type: String,
      required: true
    },
    collegeName: {
      type: String,
      required: true
    },
    courseOffered: {
      type: String,
      required: true
    },
    isReviewed: {
      type: Boolean,
      default: false
    }
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the User schema
  });
  const Booking = mongoose.model('Booking', bookingSchema);
// const User = mongoose.model('User', userSchema);

module.exports =  Booking ;