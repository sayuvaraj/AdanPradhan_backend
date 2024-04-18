const express = require("express");
const router=express();
const User = require("../models/User");
const College = require("../models/College");
const Booking = require("../models/bookings");
const CollegeUser = require("../models/College_User");
const CourseReview=require('../models/CourseReview');
const authenticate = require('../middleware/authenticate');

router.put('/api/bookings/:bookingId/reviewed', async (req, res) => {
    const { bookingId } = req.params;
  
    try {
        // Find the booking by ID
        const booking = await Booking.findById(bookingId);
  
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
  
        // Set isReviewed field to true
        booking.isReviewed = true;
  
        // Save the updated booking
        await booking.save();
  
        // Respond with success message
        res.json({ message: 'Booking marked as reviewed successfully' });
    } catch (error) {
        console.error('Error marking booking as reviewed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });



  router.get('/bookings/getdetails/:bookingId', async (req, res) => {
    const bookingId = req.params.bookingId;
  
    try {
        // Find the booking by ID
        const booking = await Booking.findById(bookingId);
  
        if (!booking) {
            return res.status(404).json({ error: 'Booking details not found' });
        }
  
        // Extract collegeName and courseOffered from the booking
        const { collegeName, courseOffered } = booking;
            
        // Send collegeName and courseOffered in the response
        res.json({ collegeName, courseOffered });
    } catch (error) {
        console.error('Error fetching booking details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/course-reviews', async (req, res) => {
    try {
      let { collegeName, courseOffered } = req.query;
     collegeName=  await collegeName.trim();
      courseOffered=  await courseOffered.trim();
      const college=collegeName;
      const courseName=courseOffered;
      // Create case-insensitive regex patterns for collegeName and courseOffered
      const collegeNamePattern = new RegExp(`^${collegeName}$`, 'i');
      
      const courseOfferedPattern = new RegExp(`^${courseOffered}$`, 'i');
      
      // Fetch course reviews from the database based on collegeName and courseOffered
      const reviews = await CourseReview.find({ college,courseName });
      
      // console.log(collegeName);
      // console.log(courseOffered);
      // console.log(reviews);
      
      res.status(200).json(reviews);
      
    } catch (error) {
      console.error('Error fetching course reviews:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/course-reviews', async (req, res) => {
    try {
        const { name, email, review, rating, college, courseName } = req.body;

        // Create a new course review instance
        const newReview = new CourseReview({
            name,
            email,
            review,
            rating,
            college,
            courseName
        });

        // Save the review to the database
        const savedReview = await newReview.save();

        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error saving course review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports =  router;