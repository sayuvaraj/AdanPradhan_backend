const mongoose = require('mongoose');

const College_User_Schema = new mongoose.Schema({
  clgname: {
    type: String,
    required: true
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
 College:[{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }],
 bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }], // Field to store booking IDs
});

const CollegeUser = mongoose.model('CollegeUser', College_User_Schema);

module.exports = CollegeUser;
