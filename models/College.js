const mongoose=require('mongoose');
// Define College schema and model
const collegeSchema = new mongoose.Schema({
    collegeName: String,
    courseOffered: String,
    numSeats: Number,
    totalSeats: Number,
    address: String,
    jntuCode: String,
    status: {
      type: String,
      default: 'running' // Default value set to 'running'
  }
  }); 
  
  const College = mongoose.model('College', collegeSchema);
module.exports =College;