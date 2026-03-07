const express = require("express");
const UserDB = require("../models/user.js");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    // check JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // find user
    const user = await UserDB.findOne({ email }).select("+password +apiKey");

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await user.save();
    // success response
      return res.status(200).cookie("access_token", token, {
        httpOnly: true,
      }).json({
        status: "success",
        message: "Login successful",
        data: {
          token,
          user,
        },
      })
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
