const express = require("express");
const Query=require("../models/Queries");
const Feedback=require("../models/Feedback");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router=express.Router();

router.post('/sendQuery', async (req, res) => {
    try {
      // Extract message data from request body
      const { name, email, address, message } = req.body;
  
      // Save the message data to your database
      const newMessage = await Query.create({ name, email, address, message });
  
      // Send a success response
      res.status(201).json({ success: true, message: 'Message sent successfully', data: newMessage });
    } catch (error) {
      // If an error occurs, send an error response
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
  });


  // POST route to handle feedback submissions
router.post('/feedbacks', async (req, res) => {
  try {
      // Extract feedback data from request body
      const { name, email, review } = req.body;

      // Perform validation if necessary
      // Example: Check if required fields are present

      // Create a new Feedback instance
      const feedback = new Feedback({
          name,
          email,
          review
      });

      // Save the feedback to the database
      await feedback.save();

      // Send a success response back to the client
      res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
      // Handle any errors that occur during the submission process
      console.error('Error submitting feedback:', error);
      // Send an error response back to the client
      res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

  module.exports =  router;