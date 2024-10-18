const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongo-db/TechExam");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
