const express = require("express");
const router=express();
const User = require("../models/User");
const authenticate = require('../middleware/authenticate')


router.get("/getdetails", authenticate, async (req, res) => {
    try {
      console.log(req.user.id);
      const user_details = await User.findOne({ _id: req.user.id });
      res.json(user_details);
    } catch {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get('/:userId', authenticate, async (req, res) => {
    try {
      const { userId } = req.params; 
  
      // Query the database to find the user by ID
      const user = await User.findById({ _id: req.user.id });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user details
      res.json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Error fetching user details' });
    }
  });

  router.put('/:userId',authenticate, async (req, res) => {
    try {
     // const userId = req.params.userId;
      const userId=req.user.id ;
      const userDataToUpdate = req.body; // Updated user data from the request body
  
      // Perform the update operation on your User model or database
      // Example: Update user details in MongoDB
      const updatedUser = await User.findByIdAndUpdate(userId, userDataToUpdate, { new: true });
  
      // Check if the user exists
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send the updated user details in the response
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports =  router;