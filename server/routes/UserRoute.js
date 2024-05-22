const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Course } = require("../db");
const userMiddleware = require("../middlewares/user");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

//signUp
router.post("/signUp", async function (req, res) {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const sanitizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userexits = await User.findOne({ email: sanitizedEmail });
    if (userexits) {
      return res.status(403).json({ msg: "Email id already exists" });
    }
    const response = await User.create({
      email: sanitizedEmail,
      password: hashedPassword,
      username: username,
    });
    res.status(200).json({
      msg: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something Went Wrong",
    });
  }
});

//signIn
router.post("/signIn", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const sanitizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({
      email: sanitizedEmail,
    });

    if (!user) {
      return res.status(403).json({ msg: "User not found with this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ msg: "Wrong Password" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    res.status(200).json({ msg: "Login Succesfully", token: token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wront" });
  }
});

// getcourse
router.get("/getCourses", async function (req, res) {
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wront" });
  }
});

module.exports = router;
