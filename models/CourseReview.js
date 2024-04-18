// Assuming you have Mongoose imported and connected to your MongoDB instance

const mongoose = require('mongoose');

// Define the CourseReview schema
const courseReviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
    college: { type: String, required: true },
    courseName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create the CourseReview model
const CourseReview = mongoose.model('CourseReview', courseReviewSchema);

module.exports = CourseReview;
