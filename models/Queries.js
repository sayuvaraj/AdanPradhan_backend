const mongoose = require('mongoose');

// Define the schema for the message data
const QueriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a model from the schema
const Query = mongoose.model('Query', QueriesSchema);

// Export the model
module.exports = Query;
