const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  profilePic: String,
  faculty_id: String,
  contact_info: String,
  department: String,
  designation: String,
  email: String,
  qualification: String,
  salary: String,
  leaves: String,
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('User', userSchema);