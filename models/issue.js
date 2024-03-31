const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
   name: {
    type: String,
    required: true,
  },
  completed:{
    type: Boolean,
    required: true,
    default: false
  },
  details: {
    type: String,
    required: false,
  },
  priority :{
    type: String, 
    required: false,
  }, 
  time_start:{
    type: String, 
    required: false,
  }, 
  time_end: {
    type: String, 
    required: false,
  }
});


module.exports = mongoose.model("Issue", IssueSchema);