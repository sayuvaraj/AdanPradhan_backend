const express = require("express");
const jwt = require("jsonwebtoken");
const CollegeUser = require("../models/College_User");
const College = require("../models/College");
const Booking = require("../models/bookings");
const bcrypt = require("bcrypt");
const clgauthenticate = require("../middleware/clgauthenticate");
const router = express.Router();
const User = require("../models/User");
router.get("/courses", clgauthenticate, async (req, res) => {
  try {
    // Get the college user's ID from the request object
    const collegeUserId = req.clg_user.id;

    // Find the college user by ID and populate the College field
    const collegeUser = await CollegeUser.findById(collegeUserId).populate(
      "College"
    );

    if (!collegeUser) {
      return res
        .status(404)
        .json({ success: false, message: "College user not found" });
    }

    // Extract the colleges associated with the college user
    const colleges = collegeUser.College;

    // Extract the course offered by each college
    const courses = colleges.map((college) => college.courseOffered);

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ success: false, message: "Error fetching courses" });
  }
});

// router.get('/bookings',clgauthenticate, async (req, res) => {
//   try {
//     // Fetch college user details by ID
//     const collegeUserId = req.clg_user.id;
//     console.log(collegeUserId);
//     const collegeUser = await CollegeUser.findById(collegeUserId);
//     console.log(collegeUser);
//     if (!collegeUser) {
//       return res.status(404).json({ success: false, message: 'College user not found' });
//     }

//     // Extract booking IDs from the college user's bookings array
//     const bookingIds = collegeUser.bookings;

//     // Fetch bookings using the IDs from the college user's bookings array
//     const bookings = await Booking.find({ _id: { $in: bookingIds } });

//     res.status(200).json({ success: true, bookings });
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ success: false, message: 'Error fetching bookings' });
//   }
// });

router.get("/bookings", clgauthenticate, async (req, res) => {
  try {
    // Fetch college user details by ID
    const collegeUserId = req.clg_user.id;
    const collegeUser = await CollegeUser.findById(collegeUserId);
    if (!collegeUser) {
      return res
        .status(404)
        .json({ success: false, message: "College user not found" });
    }

    // Extract booking IDs from the college user's bookings array
    const bookingIds = collegeUser.bookings;

    // Fetch bookings using the IDs from the college user's bookings array
    const bookings = await Booking.find({ _id: { $in: bookingIds } }).exec();

    // Array to store promises to fetch user details for each booking
    const enrichedBookings = [];

    const users1 = await User.find().exec(); // Retrieve all documents from the user collection

    users1.forEach((user) => {
     // console.log(user.email); // Print each document
    });
    //console.log(" between");
    const users2 = await Booking.find().exec(); // Retrieve all documents from the user collection

    users2.forEach((user) => {
    //  console.log(user.email); // Print each document
    });

    for (const booking of bookings) {
      // console.log(booking);
      const user = await User.findOne({email:booking.email}).exec();
      // console.log(user);
      const enrichedBooking = {
        ...booking.toObject(), // Convert Mongoose document to plain JavaScript object
        collegeName: user ? user.collegeName : "Unknown",
        contactNo: user ? user.contactNo : "Unknown",
      };
      enrichedBookings.push(enrichedBooking);
    }
       
    // Send the enriched bookings as response
    res.status(200).json({ success: true, bookings: enrichedBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching bookings" });
  }
});

module.exports = router;
