const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Feedback = require("./models/Feedback");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const College = require("./models/College");
const Booking = require("./models/bookings");
const CollegeUser = require("./models/College_User");

const authenticate = require("./middleware/authenticate");
const clgauthenticate = require("./middleware/clgauthenticate");
const CourseReview = require("./models/CourseReview");
const cors = require("cors");
require("dotenv").config();
// const router1=require('./routes/StudentBookings')
const app = express();
const bodyParser = require("body-parser");
const stu_auth = require("./routes/StudentRegister");
const clg_auth = require("./routes/College_Auth");
const ClgWorkshops = require("./routes/ClgWorkshops");
const Addworkshop = require("./routes/AddWorkhop");
const ClgBookedStudents = require("./routes/ClgBookedStudents");
const Contact = require("./routes/Contact");

const StudentBookings = require("./routes/StudentBookings");
const Student_profile = require("./routes/Student_profile");
const UsershowBooking = require("./routes/UserShowBooking");
const CollegeReview = require("./routes/CollegeReviews");
const Studentworkshops = require("./routes/Studentworkshops");

 //console.log(SECRET_KEY);

// Apply cors middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
// app.use(bodyParser.json());
// Connect to MongoDB
// app.use(router1);


const uri = process.env.uri;

mongoose.connect(uri);

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: " + err);
  process.exit(1);
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connection successful");
});

app.use("/api", stu_auth);
app.use("/api", stu_auth);
app.use("/api", clg_auth);
app.use("/api", clg_auth);

app.use("/api/clg", ClgWorkshops);
app.use("/api/clg", ClgWorkshops);

app.use("/api/clg", Addworkshop);

app.use("/api/clg", ClgBookedStudents);

app.use("/adan", Contact);

app.use("/api/user/", StudentBookings);
app.use("/api/user/profile", Student_profile);
app.use("/api/student", UsershowBooking);
app.use("/api/user", CollegeReview);
app.use("/adanpradhanworkshops/user", Studentworkshops);
app.use("/api", CollegeReview);

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

// /api/bookings/${bookingId}/reviewed
app.put("/api/bookings/:bookingId/reviewed", async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Find the booking by ID
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Set isReviewed field to true
    booking.isReviewed = true;

    // Save the updated booking
    await booking.save();

    // Respond with success message
    res.json({ message: "Booking marked as reviewed successfully" });
  } catch (error) {
    console.error("Error marking booking as reviewed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
