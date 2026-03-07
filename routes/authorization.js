const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const publicId = require("../util/publicIdGenerator");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phone } = req.body;

    if (!firstName || !lastName || !email || !password || !role || !phone) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required.",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        {email},
        {mobileNumber: phone},
      ]
    });
    
    if (existingUser?.email === email) {
      return res.status(409).json({
        status: "error",
        message: "Email already registered.",
      });
    }else if (existingUser?.mobileNumber === phone) {
      return res.status(409).json({
        status: "error",
        message: "Mobile number already registered.",
      });
    }

 

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      public_Id: publicId(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      mobileNumber: phone,
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully.",
      data: {
        id: user._id,
        public_Id: user.public_Id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        mobileNumber: user.mobileNumber,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
});

module.exports = router;
