const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router=express.Router();
const User = require("../models/User");
require('dotenv').config();

const SECRET_KEY= process.env.SECRET_KEY;
router.post("/register", async (req, res) => {
    try {
      const { username, email, password, contactNo, collegeName } = req.body;
  
      // Check if user already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        contactNo, // Add contactNo field
        collegeName, // Add collegeName field
      });
  
      // Save user to the database
      await newUser.save();
  
      // Respond with success message and redirect instruction
      res.status(200).json({ success: true, message: "Registration successful", redirectTo: "/login" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  });

  
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }
  
      const data = {
        user: {
          id: user.id,
        },
      };
      if (user) {
        //console.log('received successfuul');
        //  res.jsong({success:"true"});
        const token = jwt.sign(data, SECRET_KEY);
        res.json({ success: true, token: token });
      } else {
        res.json({ success: false, message: "Not authenticated" });
      }
      // User authenticated, return success message or token
      //res.json({ message: 'Login successful', user: { username: user.username, email: user.email } });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Error logging in user" });
    }
  });

  module.exports =  router;
