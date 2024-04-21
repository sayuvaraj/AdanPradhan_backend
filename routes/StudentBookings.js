const express = require("express");
const router=express();
const User = require("../models/User");
const College = require("../models/College");
const Booking = require("../models/bookings");
const CollegeUser = require("../models/College_User");
const authenticate = require('../middleware/authenticate')
const nodemailer = require('nodemailer');


// Define your email sending function
// const sendEmailNotification = async (email) => {
//     try {
//         // Check if the email is valid
//         if (!validateEmail(email)) {
//             console.error('Invalid email address:', email);
//             return; // Exit the function if the email is invalid
//         }

//         // Create a Nodemailer transporter using SMTP
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: 'sayuvarajr@gmail.com', // Replace with your Gmail email
//                 pass: 'sxlw phdg txqz svjr' // Replace with your Gmail password
//             }
//         });

//         // Define email options
//         const mailOptions = {
//             from: 'sayuvarajr@gmail.com',
//             to: email,
//             subject: 'Booking Confirmation',
//             text: 'Thank you for your booking. We will get back to you soon.'
//         };

//         // Send the email
//         await transporter.sendMail(mailOptions);

//         console.log('Email notification sent successfully');
//     } catch (error) {
//         console.error('Error sending email notification:', error);
//     }
// };

// Function to validate email address
const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


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
// router.post("/user_post/bookings", authenticate, async (req, res) => {
//     try {
//         // Extract booking details from the request body
//         let { name, email, date, slotTimings, collegeName, courseOffered } = req.body;
  
//         // Create a new booking document
//          collegeName=collegeName.trim();
//          courseOffered=courseOffered.trim();
//         const newBooking = new Booking({
//             name,
//             email,
//             date,
//             slotTimings,
//             collegeName,
//             courseOffered,
//         });
  
//         // Save the booking document to the database
//         const savedBooking = await newBooking.save();
  
//         // Update the user document with the booking ID
//         await User.findByIdAndUpdate(
//             { _id: req.user.id },
//             { $push: { bookings: savedBooking._id } }
//         );
  
//         // Send email notification to the user
//         sendEmailNotification(email);
  
//         // Update the CollegeUser document with the booking ID
//         // Your existing code for updating CollegeUser document goes here
//         try {
//           // Update the CollegeUser document with the booking ID
//           const updatedCollegeUser = await CollegeUser.findOneAndUpdate(
//             { clgname: collegeName },
//             { $push: { bookings: savedBooking._id } },
//             { new: true } // Return the updated document
//           );
        
//           if (!updatedCollegeUser) {
//             console.error('CollegeUser document not found for college:', collegeName);
//             // Handle the case where the CollegeUser document doesn't exist
//             // This could indicate a data consistency issue or incorrect collegeName
//           }
         
//           // Return success response
//           res.status(201).json({ success: true, message: "Booking details saved successfully" });
//         } catch (error) {
//           console.error("Error updating CollegeUser document:", error);
//           res.status(500).json({ success: false, message: "Error updating CollegeUser document" });
//         }
//     } catch (error) {
//         console.error("Error saving booking details:", error);
//         res.status(500).json({ success: false, message: "Error saving booking details" });
//     }
//   });

// Define your email sending function
const sendEmailNotification = async (email, name, date, slotTimings, collegeName, courseOffered) => {
  try {
      // Check if the email is valid
      if (!validateEmail(email)) {
          console.error('Invalid email address:', email);
          return; // Exit the function if the email is invalid
      }

      // Create a Nodemailer transporter using SMTP
      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'sayuvarajr@gmail.com', // Replace with your Gmail email
              pass: 'sxlw phdg txqz svjr' // Replace with your Gmail password
          }
      });

      // Define email options
      const mailOptions = {
          from: 'sayuvarajr@gmail.com',
          to: email,
          subject: 'Booking Confirmation',
          text: `Dear ${name},

Thank you for booking the workshop. Here are your booking details.:
Date: ${date}
Slot Timings: ${slotTimings}
College Name: ${collegeName}
Course Offered: ${courseOffered}

We are excited to have you join us!

Best regards,
Your Workshop Team`
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log('Email notification sent successfully');
  } catch (error) {
      console.error('Error sending email notification:', error);
  }
};

// Function to validate email address
// const validateEmail = (email) => {
//   // Regular expression for email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

router.post("/user_post/bookings", authenticate, async (req, res) => {
  try {
      // Extract booking details from the request body
      let { name, email, date, slotTimings, collegeName, courseOffered } = req.body;

      // Create a new booking document
      collegeName = collegeName.trim();
      courseOffered = courseOffered.trim();
      const newBooking = new Booking({
          name,
          email,
          date,
          slotTimings,
          collegeName,
          courseOffered,
      });

      // Save the booking document to the database
      const savedBooking = await newBooking.save();

      // Update the user document with the booking ID
      await User.findByIdAndUpdate(
          { _id: req.user.id },
          { $push: { bookings: savedBooking._id } }
      );

      // Send email notification to the user
      sendEmailNotification(email, name, date, slotTimings, collegeName, courseOffered);

      // Update the CollegeUser document with the booking ID
      // Your existing code for updating CollegeUser document goes here
      try {
          // Update the CollegeUser document with the booking ID
          const updatedCollegeUser = await CollegeUser.findOneAndUpdate(
              { clgname: collegeName },
              { $push: { bookings: savedBooking._id } },
              { new: true } // Return the updated document
          );

          if (!updatedCollegeUser) {
              console.error('CollegeUser document not found for college:', collegeName);
              // Handle the case where the CollegeUser document doesn't exist
              // This could indicate a data consistency issue or incorrect collegeName
          }

          // Return success response
          res.status(201).json({ success: true, message: "Booking details saved successfully" });
      } catch (error) {
          console.error("Error updating CollegeUser document:", error);
          res.status(500).json({ success: false, message: "Error updating CollegeUser document" });
      }
  } catch (error) {
      console.error("Error saving booking details:", error);
      res.status(500).json({ success: false, message: "Error saving booking details" });
  }
});

module.exports = router;

  
  module.exports =  router;
