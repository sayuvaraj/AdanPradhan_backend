const express = require("express");
const jwt = require("jsonwebtoken");
const CollegeUser = require("../models/College_User");
const bcrypt = require("bcrypt");

const router=express.Router();
require('dotenv').config();
const SECRET_KEY= process.env.SECRET_KEY;
router.post('/clg_login', async (req, res) => {
    try {
        const { email, password } = req.body;
         console.log(email);
  
         console.log(password);
        // Check if the user with the provided email exists
        const clg_user = await CollegeUser.findOne({ email });
        if (!clg_user) {
            return res.status(400).json({ message: 'Invalid email ' });
        }
  
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, clg_user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        console.log(clg_user);
        const data = {
          clg_user: {
            id: clg_user.id,
          },
        };
        if (clg_user) {
          //console.log('received successfuul');
          //  res.jsong({success:"true"});
          const clg_token = jwt.sign(data, SECRET_KEY);
          res.json({ success: true, clg_token: clg_token });
        } else {
          res.json({ success: false, message: "Not authenticated" });
        }
  
        // If the email and password are valid, return a success response
        //res.status(200).json({ message: 'Login successful', clg_user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
  });
  router.post("/clg", async (req, res) => {
    try {
      const {clgname,email,password} = req.body;
      console.log(clgname,email,password);
      //check if any user is present or not
      const existing_clg_user = await CollegeUser.find({ email });
      console.log(existing_clg_user, " is the logged clg ");
      if (existing_clg_user.length != 0) {
        console.log("User with this email already exists");
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }
  
      const salt = await bcrypt.genSalt(10); // Generate salt
       const hashedPassword = await bcrypt.hash(password, salt); // Use the generated salt for hashing
  
      // Create new user
      const clgnewUser = new CollegeUser({
        clgname: clgname,
        email: email,
        password: hashedPassword,
      });
  
      await clgnewUser.save();
  
      // response to the frontend
      res.status(200).json(clgnewUser);
    } catch (error) {
      console.error("Error registering college user:", error);
      res.status(500).json({ message: "Error registering college user" });
    }
  });


  module.exports =  router;