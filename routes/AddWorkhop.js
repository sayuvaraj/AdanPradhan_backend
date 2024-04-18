const express = require("express");
const CollegeUser = require("../models/College_User");
const College = require("../models/College");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const clgauthenticate =require('../middleware/clgauthenticate');
const router=express.Router();




router.post("/College_data",clgauthenticate, async (req, res) => {
    try {
      const {
        collegeName,
        courseOffered,
        numSeats,
        totalSeats,
        address,
        jntuCode,
      } = req.body;
       //const courseOffered1=courseOffered.trim();
      // const collegeName1=collegeName.trim();
      // Create a new college document
      const newCollege = new College({
        collegeName,
        courseOffered,
        numSeats,
        totalSeats,
        address,
        jntuCode,
      });
  
      // Save the college document to the database
      const savedCollege = await newCollege.save();
  
      // Get the ID of the saved college document
      const collegeId = savedCollege._id;
  
      // Update the corresponding CollegeUser document with the new college ID
      // Assuming you have some way to identify the CollegeUser (e.g., via email)
      // Here, I'm assuming you're using email for identification
     // const { email } = req.body; // Assuming email is sent in the request body
      const collegeUser = await CollegeUser.findOneAndUpdate(
        { _id: req.clg_user.id }, // Assuming email is the unique identifier for CollegeUser
        { $push: { College: collegeId } }, // Push the collegeId to the College array
        { new: true } // Return the modified document after update
      );
  
      // Respond with success message
      res.status(200).json({ message: "College data submitted successfully", collegeUser });
    } catch (error) {
      console.error("Error submitting college data:", error);
      res.status(500).json({ message: "Error submitting college data" });
    }
  });
  

router.get('/clgName',clgauthenticate,async (req,res)=>{
        try{ 
              console.log(req.clg_user.id);
              const coll =  await CollegeUser.findById({_id:req.clg_user.id});
              console.log(coll);
              if (!coll) {
                return res.status(404).json({ error: 'College user not found' });
            }
              res.json(coll.clgname);
        }
       catch{
             console.error(error.message);
             res.status(500).send("Internal Server Error"); 
       }
   })

   
   module.exports =  router;