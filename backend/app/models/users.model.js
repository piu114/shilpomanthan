const mongoose = require("mongoose");

const AppSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  email: String,
  password: String
});

module.exports = mongoose.model("users", AppSchema);