const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true     
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user' 
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
  });

  module.exports = mongoose.model("User", userSchema);