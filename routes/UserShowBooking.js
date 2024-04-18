const express = require("express");
const router=express();
const User = require("../models/User");
const Booking = require("../models/bookings");
const College = require("../models/College");
const CollegeUser = require("../models/College_User");
const authenticate = require('../middleware/authenticate')

router.get('/bookings', authenticate, async (req, res) => {
    try {
      // Find the user by ID
    
      const user = await User.findOne({ _id: req.user.id });
  
      // Fetch bookings for the user
      const bookings = await Booking.find({ _id: { $in: user.bookings } })
        
        
  
      // Format booking details with course name and college name
      const formattedBookings = bookings.map((booking) => ({
        userId: user._id,
        userName: user.name,
        courseName: booking.courseOffered,
        slotTimings: booking.slotTimings,
        date: booking.date,
        isReviewed: booking.isReviewed,
        bookingId: booking._id,
        collegeName: booking.collegeName
        // Add other booking details as needed
      }));
      res.json(formattedBookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      res.status(500).json({ message: "Error fetching user bookings" });
    }
  });


  router.delete('/delete/booking/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
  
        // Delete the booking from User collection
        await User.findOneAndUpdate(
            { bookings: bookingId },
            { $pull: { bookings: bookingId } }
        );
  
        // Delete the booking from CollegeUser collection
        await CollegeUser.findOneAndUpdate(
            { bookings: bookingId },
            { $pull: { bookings: bookingId } }
        );
  
        // Delete the booking
        await Booking.findByIdAndDelete(bookingId);
  
        // Respond with a success message
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports =  router;