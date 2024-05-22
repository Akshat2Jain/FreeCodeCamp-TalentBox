const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(`${process.env.MONGO_URL}`);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
  User,
  Course,
};
