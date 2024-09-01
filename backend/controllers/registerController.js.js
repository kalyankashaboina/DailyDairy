const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/registermodel");
const dotenv=require("dotenv")
dotenv.config()
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const JWT_SECRET =process.env.JWT_SECRET ;

const registerUser = async (req, res) => {
  try {
    console.log("request body==>",req)
    const { FirstName, LastName, Email, Password } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = new User({ FirstName, LastName, Email, Password: hashedPassword });

    await user.save();

    // const token = jwt.sign({ userId: user._id, Email: user.Email }, JWT_SECRET, { expiresIn: '1h' });
console.log("user cretaed ")
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }

    res.status(500).json({ message: "Failed to register", error: error });
  }
};








module.exports = {registerUser
};



