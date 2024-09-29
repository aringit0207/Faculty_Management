const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    profilePic: String,
   faculty_id: String,
   contact_info:String,
   department:String,
   designation:String,
   email:String,
   qualification:String,
   salary:String,
   leaves:String
});

const Faculty = new mongoose.model('Faculty', userSchema);
module.exports = Faculty;