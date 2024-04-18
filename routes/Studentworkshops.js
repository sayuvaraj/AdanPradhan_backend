const express = require("express");
const router=express();
const User = require("../models/User");
const Booking = require("../models/bookings");
const College = require("../models/College");
const CollegeUser = require("../models/College_User");
const CourseReview=require("../models/CourseReview");
const authenticate = require('../middleware/authenticate')
const clgauthenticate = require("../middleware/clgauthenticate");
const cors = require("cors");

router.get("/workshops", async (req, res) => {
    try {

        console.log('hello');
      // Fetch all colleges from the database
      const colleges = await College.find({});
      res.status(200).json(colleges);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      res.status(500).send("Internal Server Error");
    }
  });


router.get('/course-reviews', async (req, res) => {
    try {

      let { collegeName, courseOffered } = req.query;
     collegeName=  await collegeName.trim();
      courseOffered=  await courseOffered.trim();
      const college=collegeName;
      const courseName=courseOffered;
      console.log(collegeName );
      console.log(courseOffered );
      console.log("try");
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
module.exports = router;