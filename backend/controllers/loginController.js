const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/registermodel");
const dotenv=require("dotenv")
dotenv.config()


const JWT_SECRET =process.env.JWT_SECRET ;

const loginUser = async (req, res) => {
  try {
    
    const { Email, Password } = req.body;

    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, Email: user.Email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error });
  }
};

module.exports = { loginUser };
