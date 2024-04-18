const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Feedback = require('./models/Feedback');
const bcrypt = require("bcrypt");
const User = require("./models/User");
const College = require("./models/College");
const Booking = require("./models/bookings");
const CollegeUser = require("./models/College_User");

const authenticate = require("./middleware/authenticate");
const clgauthenticate = require("./middleware/clgauthenticate");
const CourseReview = require('./models/CourseReview');
const cors = require("cors");
require('dotenv').config();
// const router1=require('./routes/StudentBookings')
const app = express();
const bodyParser=require('body-parser');
const stu_auth=require('./routes/StudentRegister');
const clg_auth=require('./routes/College_Auth');
const ClgWorkshops=require('./routes/ClgWorkshops');
const Addworkshop= require('./routes/AddWorkhop');
const ClgBookedStudents=require('./routes/ClgBookedStudents');
const Contact =require('./routes/Contact');


const StudentBookings=require('./routes/StudentBookings');
const Student_profile=require('./routes/Student_profile');
const UsershowBooking=require('./routes/UserShowBooking');
const CollegeReview =require('./routes/CollegeReviews');
const Studentworkshops=require('./routes/Studentworkshops');

// const SECRET_KEY = "sayuvaraj";

const SECRET_KEY= process.env.SECRET_KEY;  //console.log(SECRET_KEY);

// Apply cors middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
// app.use(bodyParser.json());
// Connect to MongoDB
// app.use(router1);



// const uri = `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const uri=process.env.uri;

mongoose.connect(uri);

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: " + err);
  process.exit(1);
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connection successful");
});


// app.post('/api/clg_login', async (req, res) => {
//   try {
//       const { email, password } = req.body;
//        console.log(email);

//        console.log(password);
//       // Check if the user with the provided email exists
//       const clg_user = await CollegeUser.findOne({ email });
//       if (!clg_user) {
//           return res.status(400).json({ message: 'Invalid email ' });
//       }

//       // Compare the provided password with the hashed password stored in the database
//       const isPasswordValid = await bcrypt.compare(password, clg_user.password);
//       if (!isPasswordValid) {
//           return res.status(400).json({ message: 'Invalid email or password' });
//       }
//       console.log(clg_user);
//       const data = {
//         clg_user: {
//           id: clg_user.id,
//         },
//       };
//       if (clg_user) {
//         //console.log('received successfuul');
//         //  res.jsong({success:"true"});
//         const clg_token = jwt.sign(data, SECRET_KEY);
//         res.json({ success: true, clg_token: clg_token });
//       } else {
//         res.json({ success: false, message: "Not authenticated" });
//       }

//       // If the email and password are valid, return a success response
//       //res.status(200).json({ message: 'Login successful', clg_user });
//   } catch (error) {
//       console.error('Error logging in:', error);
//       res.status(500).json({ message: 'Error logging in' });
//   }
// });
// app.post("/api/clg", async (req, res) => {
//   try {
//     const {clgname,email,password} = req.body;
//     console.log(clgname,email,password);
//     //check if any user is present or not
//     const existing_clg_user = await CollegeUser.find({ email });
//     console.log(existing_clg_user, " is the logged clg ");
//     if (existing_clg_user.length != 0) {
//       console.log("User with this email already exists");
//       return res
//         .status(400)
//         .json({ message: "User with this email already exists" });
//     }

//     const salt = await bcrypt.genSalt(10); // Generate salt
//      const hashedPassword = await bcrypt.hash(password, salt); // Use the generated salt for hashing

//     // Create new user
//     const clgnewUser = new CollegeUser({
//       clgname: clgname,
//       email: email,
//       password: hashedPassword,
//     });

//     await clgnewUser.save();

//     // response to the frontend
//     res.status(200).json(clgnewUser);
//   } catch (error) {
//     console.error("Error registering college user:", error);
//     res.status(500).json({ message: "Error registering college user" });
//   }
// });
// Define POST route for user registration

// app.post("/api/register", async (req, res) => {
//   try {
//     const { username, email, password, contactNo, collegeName } = req.body;

//     // Check if user already exists
//     let existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User with this email already exists" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       contactNo, // Add contactNo field
//       collegeName, // Add collegeName field
//     });

//     // Save user to the database
//     await newUser.save();

//     // Respond with success message and redirect instruction
//     res.status(200).json({ success: true, message: "Registration successful", redirectTo: "/login" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Error registering user" });
//   }
// });



// Define POST route for user login
// const SECRET_KEY='sayuvaraj';
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare passwords
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const data = {
//       user: {
//         id: user.id,
//       },
//     };
//     if (user) {
//       //console.log('received successfuul');
//       //  res.jsong({success:"true"});
//       const token = jwt.sign(data, SECRET_KEY);
//       res.json({ success: true, token: token });
//     } else {
//       res.json({ success: false, message: "Not authenticated" });
//     }
//     // User authenticated, return success message or token
//     //res.json({ message: 'Login successful', user: { username: user.username, email: user.email } });
//   } catch (error) {
//     console.error("Error logging in user:", error);
//     res.status(500).json({ message: "Error logging in user" });
//   }
// });
// const SECRET_KEY='sayuvaraj';

// Import necessary modules

// Define route handler for storing booking details
// const CollegeUser = require('../models/CollegeUser'); // Import CollegeUser model

// app.post("/api/bookings", authenticate, async (req, res) => {
//   try {
//     // Extract booking details from the request body
//     const { name, email, date, slotTimings, collegeName, courseOffered } = req.body;

//     // Create a new booking document
//     const newBooking = new Booking({
//       name,
//       email,
//       date,
//       slotTimings,
//       collegeName,
//       courseOffered,
//     });
//     const  collegeName1 = collegeName.trim();
//     // Save the booking document to the database
//     const savedBooking = await newBooking.save();

//     // Update the user document with the booking ID
//     await User.findByIdAndUpdate(
//       { _id: req.user.id },
//       { $push: { bookings: savedBooking._id } }
//     );

//     try {
//       // Update the CollegeUser document with the booking ID
//       const updatedCollegeUser = await CollegeUser.findOneAndUpdate(
//         { clgname: collegeName1 },
//         { $push: { bookings: savedBooking._id } },
//         { new: true } // Return the updated document
//       );
    
//       if (!updatedCollegeUser) {
//         console.error('CollegeUser document not found for college:', collegeName);
//         // Handle the case where the CollegeUser document doesn't exist
//         // This could indicate a data consistency issue or incorrect collegeName
//       }
    
//       // Return success response
//       res.status(201).json({ success: true, message: "Booking details saved successfully" });
//     } catch (error) {
//       console.error("Error updating CollegeUser document:", error);
//       res.status(500).json({ success: false, message: "Error updating CollegeUser document" });
//     }
//   } catch (error) {
//     console.error("Error saving booking details:", error);
//     res.status(500).json({ success: false, message: "Error saving booking details" });
//   }
// });

app.use('/api',stu_auth);
app.use('/api',stu_auth);
app.use('/api',clg_auth);
app.use('/api',clg_auth);

app.use('/api/clg',ClgWorkshops);
app.use('/api/clg',ClgWorkshops);

app.use('/api/clg',Addworkshop);


app.use('/api/clg',ClgBookedStudents);
 
app.use('/adan',Contact);


app.use('/api/user/',StudentBookings);
app.use('/api/user/profile',Student_profile);
app.use('/api/student',UsershowBooking);
app.use('/api/user',CollegeReview);
app.use('/adanpradhanworkshops/user',Studentworkshops);
app.use('/api',CollegeReview);
                  
      // student bookings -- complete 

// const nodemailer = require('nodemailer');

// // Define your email sending function
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

// // Function to validate email address
// const validateEmail = (email) => {
//     // Regular expression for email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// };


// Define POST route for storing booking details

// app.post("/api/user_post/bookings", authenticate, async (req, res) => {
//   try {
//       // Extract booking details from the request body
//       let { name, email, date, slotTimings, collegeName, courseOffered } = req.body;

//       // Create a new booking document
//        collegeName=collegeName.trim();
//        courseOffered=courseOffered.trim();
//       const newBooking = new Booking({
//           name,
//           email,
//           date,
//           slotTimings,
//           collegeName,
//           courseOffered,
//       });

//       // Save the booking document to the database
//       const savedBooking = await newBooking.save();

//       // Update the user document with the booking ID
//       await User.findByIdAndUpdate(
//           { _id: req.user.id },
//           { $push: { bookings: savedBooking._id } }
//       );

//       // Send email notification to the user
//       sendEmailNotification(email);

//       // Update the CollegeUser document with the booking ID
//       // Your existing code for updating CollegeUser document goes here
//       try {
//         // Update the CollegeUser document with the booking ID
//         const updatedCollegeUser = await CollegeUser.findOneAndUpdate(
//           { clgname: collegeName },
//           { $push: { bookings: savedBooking._id } },
//           { new: true } // Return the updated document
//         );
      
//         if (!updatedCollegeUser) {
//           console.error('CollegeUser document not found for college:', collegeName);
//           // Handle the case where the CollegeUser document doesn't exist
//           // This could indicate a data consistency issue or incorrect collegeName
//         }
       
//         // Return success response
//         res.status(201).json({ success: true, message: "Booking details saved successfully" });
//       } catch (error) {
//         console.error("Error updating CollegeUser document:", error);
//         res.status(500).json({ success: false, message: "Error updating CollegeUser document" });
//       }
//   } catch (error) {
//       console.error("Error saving booking details:", error);
//       res.status(500).json({ success: false, message: "Error saving booking details" });
//   }
// });








// app.post("/api/bookings", authenticate, async (req, res) => {
//   try {
//     // Extract booking details from the request body
//     const { name, email, date, slotTimings, collegeName, courseOffered } = req.body;

//     // Create a new booking document
//     const newBooking = new Booking({
//       name,
//       email,
//       date,
//       slotTimings,
//       collegeName,
//       courseOffered,
//     });

//     // Save the booking document to the database
//     const savedBooking = await newBooking.save();

//     // Update the user document with the booking ID
//     await User.findByIdAndUpdate(
//       { _id: req.user.id },
//       { $push: { bookings: savedBooking._id } }
//     );

//     // Find the CollegeUser document by college name
// const collegeUser = await CollegeUser.findOne({ clgname: collegeName });
//     const collegeUser = await CollegeUser.findOne({ clgname: collegeName });

//     if (!collegeUser) {
//       console.error('CollegeUser document not found for college:', collegeName);
//       // Handle the case where the CollegeUser document doesn't exist
//       return res.status(404).json({ success: false, message: "CollegeUser document not found" });
//     }

//     // Update the CollegeUser document with the booking ID
//     collegeUser.bookings.push(savedBooking._id);
//     await collegeUser.save();

//     // Return success response
//     res.status(201).json({ success: true, message: "Booking details saved successfully" });
//   } catch (error) {
//     console.error("Error saving booking details:", error);
//     res.status(500).json({ success: false, message: "Error saving booking details" });
//   }
// });


                                  // student show bookings --complete
// app.get('/student/bookings', authenticate, async (req, res) => {
//   try {
//     // Find the user by ID
//     console.log("hello");
//     const user = await User.findOne({ _id: req.user.id });

//     // Fetch bookings for the user
//     const bookings = await Booking.find({ _id: { $in: user.bookings } })
      
      

//     // Format booking details with course name and college name
//     const formattedBookings = bookings.map((booking) => ({
//       userId: user._id,
//       userName: user.name,
//       courseName: booking.courseOffered,
//       slotTimings: booking.slotTimings,
//       date: booking.date,
//       isReviewed: booking.isReviewed,
//       bookingId: booking._id,
//       collegeName: booking.collegeName
//       // Add other booking details as needed
//     }));
//     res.json(formattedBookings);
//   } catch (error) {
//     console.error("Error fetching user bookings:", error);
//     res.status(500).json({ message: "Error fetching user bookings" });
//   }
// });


                    //  adding workshops -- complete

// Define POST route for submitting  adding  workshop (college data)
// app.post("/College_data",clgauthenticate, async (req, res) => {
//   try {
//     const {
//       collegeName,
//       courseOffered,
//       numSeats,
//       totalSeats,
//       address,
//       jntuCode,
//     } = req.body;
//      //const courseOffered1=courseOffered.trim();
//     // const collegeName1=collegeName.trim();
//     // Create a new college document
//     const newCollege = new College({
//       collegeName,
//       courseOffered,
//       numSeats,
//       totalSeats,
//       address,
//       jntuCode,
//     });

//     // Save the college document to the database
//     const savedCollege = await newCollege.save();

//     // Get the ID of the saved college document
//     const collegeId = savedCollege._id;

//     // Update the corresponding CollegeUser document with the new college ID
//     // Assuming you have some way to identify the CollegeUser (e.g., via email)
//     // Here, I'm assuming you're using email for identification
//    // const { email } = req.body; // Assuming email is sent in the request body
//     const collegeUser = await CollegeUser.findOneAndUpdate(
//       { _id: req.clg_user.id }, // Assuming email is the unique identifier for CollegeUser
//       { $push: { College: collegeId } }, // Push the collegeId to the College array
//       { new: true } // Return the modified document after update
//     );

//     // Respond with success message
//     res.status(200).json({ message: "College data submitted successfully", collegeUser });
//   } catch (error) {
//     console.error("Error submitting college data:", error);
//     res.status(500).json({ message: "Error submitting college data" });
//   }
// });
                           // getting clgname as props readonly  in adding workshop

//  app.get('/api/clgName',clgauthenticate,async (req,res)=>{
//       try{ 
//             console.log(req.clg_user.id);
//             const coll =  await CollegeUser.findById({_id:req.clg_user.id});
//             console.log(coll);
//             if (!coll) {
//               return res.status(404).json({ error: 'College user not found' });
//           }
//             res.json(coll.clgname);
//       }
//      catch{
//            console.error(error.message);
//            res.status(500).send("Internal Server Error"); 
//      }
//  })
                          

                         // student workshops --complete 

// app.get("/api/workshops", async (req, res) => {
//   try {
//     // Fetch all colleges from the database
//     const colleges = await College.find({});
//     res.status(200).json(colleges);
//   } catch (error) {
//     console.error("Error fetching colleges:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });



app.get("/getdetails", authenticate, async (req, res) => {
  try {
    console.log(req.user.id);
    const user_details = await User.findOne({ _id: req.user.id });
    res.json(user_details);
  } catch {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

                      // ClgWorkshops -complete

// app.get('/api/clg/getYourworkshops', clgauthenticate, async (req, res) => {
//   try {
//     // Assuming CollegeUser model has 'College' array
//     const collegeUser = await CollegeUser.findById(req.clg_user.id);
//     const colleges = collegeUser.College;
//     const colleges_list = await College.find({_id:{$in:colleges}});
//     const formattedcolleges = colleges_list.map((col) => ({
//       collegeName: col.collegeName,
//       courseOffered: col.courseOffered,
//       college_id:col._id,
//       status:col.status
//     }));
//     //console.log(formattedcolleges);
//     res.status(200).json({ formattedcolleges });

//   } catch (error) {
//     console.error('Error fetching workshops:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

                      // ClgWorkshops -- complete 

// app.put('/api/clg/updateStatus/:collegeId', async (req, res) => {
//   try {
//     const { collegeId } = req.params;
//     const { status } = req.body;
//       console.log(collegeId);

//       console.log(status);
//     // Find the college by ID and update its status
//     const updatedCollege = await College.findByIdAndUpdate(collegeId, { status }, { new: true });

//     if (!updatedCollege) {
//       return res.status(404).json({ error: 'College not found' });
//     }

//     // Return the updated college
//     res.json({ updatedCollege });
//   } catch (error) {
//     console.error('Error updating status:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

                    // clg booked student --complete 

// app.get('/api/clg/courses', clgauthenticate, async (req, res) => {
//   try {
//     // Get the college user's ID from the request object
//     const collegeUserId = req.clg_user.id;

//     // Find the college user by ID and populate the College field
//     const collegeUser = await CollegeUser.findById(collegeUserId).populate('College');
     
//     if (!collegeUser) {
//       return res.status(404).json({ success: false, message: 'College user not found' });
//     }

//     // Extract the colleges associated with the college user
//     const colleges = collegeUser.College;

//     // Extract the course offered by each college
//     const courses = colleges.map(college => college.courseOffered);

//     res.status(200).json({ success: true, courses });
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     res.status(500).json({ success: false, message: 'Error fetching courses' });
//   }
// });




// app.get('/api/clg/bookings',clgauthenticate, async (req, res) => {
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










                                // student profile --complete.

// app.get('/api/user/:userId', authenticate, async (req, res) => {
//   try {
//     const { userId } = req.params; 

//     // Query the database to find the user by ID
//     const user = await User.findById({ _id: req.user.id });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Return the user details
//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ message: 'Error fetching user details' });
//   }
// });

// app.put('/api/user/:userId',authenticate, async (req, res) => {
//   try {
//    // const userId = req.params.userId;
//     const userId=req.user.id ;
//     const userDataToUpdate = req.body; // Updated user data from the request body

//     // Perform the update operation on your User model or database
//     // Example: Update user details in MongoDB
//     const updatedUser = await User.findByIdAndUpdate(userId, userDataToUpdate, { new: true });

//     // Check if the user exists
//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Send the updated user details in the response
//     res.json(updatedUser);
//   } catch (error) {
//     console.error('Error updating user details:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


                      // clgbookedstudent --complete
// app.get('/bookings', clgauthenticate, async (req, res) => {
//   try {
//     // Fetch college user details by ID
//     const collegeUserId = req.clg_user.id;
//     const collegeUser = await CollegeUser.findById(collegeUserId);
//     if (!collegeUser) {
//       return res.status(404).json({ success: false, message: 'College user not found' });
//     }

//     // Extract booking IDs from the college user's bookings array
//     const bookingIds = collegeUser.bookings;
       
//     // Fetch bookings using the IDs from the college user's bookings array
//     const bookings = await Booking.find({ _id: { $in: bookingIds } });

//     // Extract unique emails from bookings
//     const emails = bookings.map(booking => booking.email);

//     // Fetch users based on unique emails
//     const users = await User.find({ email: { $in: emails } });

//     // Map user details to each booking
//     const bookingsWithUserDetails = bookings.map(booking => {
//       const user = users.find(user => user.email === booking.email);
//       if (user) {
//         return {
//           _id: booking._id,
//           name: booking.name,
//           email: booking.email,
//           date: booking.date,
//           slotTimings: booking.slotTimings,
//           collegeName: booking.collegeName,
//           courseOffered: booking.courseOffered,
//           contactNo: user.contactNo, // Add contactNo from user details
//           username: user.username, // Add username from user details
//           // Add other fields you need from user details
//         };
//       } else {
//         console.error(`User not found for booking email: ${booking.email}`);
//         return null;
//       }
//     }).filter(Boolean); // Filter out null values

//     res.status(200).json({ success: true, bookings: bookingsWithUserDetails });
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ success: false, message: 'Error fetching bookings' });
//   }
// });







    // delete the booking 

//                                      DELETE a booking by ID  --complete
// app.delete('/delete/booking/:bookingId', async (req, res) => {
//   try {
//       const bookingId = req.params.bookingId;

//       // Delete the booking from User collection
//       await User.findOneAndUpdate(
//           { bookings: bookingId },
//           { $pull: { bookings: bookingId } }
//       );

//       // Delete the booking from CollegeUser collection
//       await CollegeUser.findOneAndUpdate(
//           { bookings: bookingId },
//           { $pull: { bookings: bookingId } }
//       );

//       // Delete the booking
//       await Booking.findByIdAndDelete(bookingId);

//       // Respond with a success message
//       res.json({ message: 'Booking deleted successfully' });
//   } catch (error) {
//       console.error('Error deleting booking:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });

                       
                    // contact -- complete

// app.post('/sendQuery', async (req, res) => {
//   try {
//     // Extract message data from request body
//     const { name, email, address, message } = req.body;

//     // Save the message data to your database
//     const newMessage = await Query.create({ name, email, address, message });

//     // Send a success response
//     res.status(201).json({ success: true, message: 'Message sent successfully', data: newMessage });
//   } catch (error) {
//     // If an error occurs, send an error response
//     console.error('Error sending message:', error);
//     res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
//   }
// });



                         // college review --complete 
// app.get('/api/bookings/getdetails/:bookingId', async (req, res) => {
//   const bookingId = req.params.bookingId;

//   try {
//       // Find the booking by ID
//       const booking = await Booking.findById(bookingId);

//       if (!booking) {
//           return res.status(404).json({ error: 'Booking details not found' });
//       }

//       // Extract collegeName and courseOffered from the booking
//       const { collegeName, courseOffered } = booking;
          
//       // Send collegeName and courseOffered in the response
//       res.json({ collegeName, courseOffered });
//   } catch (error) {
//       console.error('Error fetching booking details:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });



// /api/bookings/${bookingId}/reviewed
app.put('/api/bookings/:bookingId/reviewed', async (req, res) => {
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


// app.get('/api/course-reviews', async (req, res) => {
//   try {
//  let { collegeName, courseOffered } = req.query;
//  collegeName = collegeName.trim();
//  courseOffered = courseOffered.trim();
//     // Fetch course reviews from the database based on collegeName and courseOffered
//     const reviews = await CourseReview.find({ collegeName, courseOffered });
//     console.log(collegeName);
//     console.log(courseOffered);
//    console.log(reviews);
//     res.status(200).json(reviews);
    
//   } catch (error) {
//     console.error('Error fetching course reviews:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

                                          // student workshops -- complete 
// app.get('/api/course-reviews', async (req, res) => {
//   try {
//     let { collegeName, courseOffered } = req.query;
//    collegeName=  await collegeName.trim();
//     courseOffered=  await courseOffered.trim();
//     const college=collegeName;
//     const courseName=courseOffered;
//     // Create case-insensitive regex patterns for collegeName and courseOffered
//     const collegeNamePattern = new RegExp(`^${collegeName}$`, 'i');
    
//     const courseOfferedPattern = new RegExp(`^${courseOffered}$`, 'i');
    
//     // Fetch course reviews from the database based on collegeName and courseOffered
//     const reviews = await CourseReview.find({ college,courseName });
    
//     // console.log(collegeName);
//     // console.log(courseOffered);
//     // console.log(reviews);
    
//     res.status(200).json(reviews);
    
//   } catch (error) {
//     console.error('Error fetching course reviews:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });





// app.post("/api/user/user_post/bookings", authenticate, async (req, res) => {
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



                     //      college review  post -- complete 
//   app.post('/api/course-reviews', async (req, res) => {
//     try {
//         const { name, email, review, rating, college, courseName } = req.body;

//         // Create a new course review instance
//         const newReview = new CourseReview({
//             name,
//             email,
//             review,
//             rating,
//             college,
//             courseName
//         });

//         // Save the review to the database
//         const savedReview = await newReview.save();

//         res.status(201).json(savedReview);
//     } catch (error) {
//         console.error('Error saving course review:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });