const express = require("express");
const jwt = require("jsonwebtoken");
const CollegeUser = require("../models/College_User");
const College = require("../models/College");
const bcrypt = require("bcrypt");
const clgauthenticate =require('../middleware/clgauthenticate');
const router=express.Router();
require('dotenv').config();

router.get('/getYourworkshops', clgauthenticate, async (req, res) => {
    try {
      // Assuming CollegeUser model has 'College' array
      const collegeUser = await CollegeUser.findById(req.clg_user.id);
      const colleges = collegeUser.College;
      const colleges_list = await College.find({_id:{$in:colleges}});
      const formattedcolleges = colleges_list.map((col) => ({
        collegeName: col.collegeName,
        courseOffered: col.courseOffered,
        college_id:col._id,
        status:col.status
      }));
      //console.log(formattedcolleges);
      res.status(200).json({ formattedcolleges });
  
    } catch (error) {
      console.error('Error fetching workshops:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



router.put('/updateStatus/:collegeId', async (req, res) => {
    try {
      const { collegeId } = req.params;
      const { status } = req.body;
        console.log(collegeId);
  
        console.log(status);
      // Find the college by ID and update its status
      const updatedCollege = await College.findByIdAndUpdate(collegeId, { status }, { new: true });
  
      if (!updatedCollege) {
        return res.status(404).json({ error: 'College not found' });
      }
  
      // Return the updated college
      res.json({ updatedCollege });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports =  router;