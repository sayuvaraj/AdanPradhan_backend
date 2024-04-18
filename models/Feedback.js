const mongoose = require('mongoose');

// Define the schema for the Feedback model
const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model using the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
