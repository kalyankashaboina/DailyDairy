const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/registermodel'); // User model

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Generate and send OTP
const requestPasswordReset = async (req, res) => {
  const { Email } = req.body;
  
  try {
    const user = await User.findOne({ Email });
    console.log("dtat from database==>",user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP

    // Update user's OTP and OTP creation time
    user.otp = otp;
    user.otpCreatedAt = new Date();
    await user.save();

    // Send OTP email
    await transporter.sendMail({
      to: Email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. It is valid for 15 minutes.`,
    });

    const testTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    testTransporter.sendMail({
        from: process.env.EMAIL,
        to: 'test@example.com',
        subject: 'Test Email',
        text: 'This is a test email.',
      }, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.log("error==>",error)
    res.status(500).json({ message: 'Error sending OTP', error });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ Email: email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP has expired (15 minutes validity)
    const otpAge = (new Date() - new Date(user.otpCreatedAt)) / 1000 / 60; // Minutes
    if (otpAge > 15) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // OTP is valid, clear OTP fields
    user.otp = null;
    user.otpCreatedAt = null;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { email, newPassword, otp } = req.body;

  try {
    const user = await User.findOne({ Email: email });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Check if OTP has expired (15 minutes validity)
    const otpAge = (new Date() - new Date(user.otpCreatedAt)) / 1000 / 60; // Minutes
    if (otpAge > 15) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // OTP is valid, hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.Password = hashedPassword;
    
    // Clear OTP fields after successful password reset
    user.otp = null;
    user.otpCreatedAt = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};

// Resend OTP
const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newOtp = crypto.randomInt(100000, 999999).toString(); // Generate new OTP

    // Update user's OTP and OTP creation time
    user.otp = newOtp;
    user.otpCreatedAt = new Date();
    await user.save();

    // Send new OTP email
    await transporter.sendMail({
      to: email,
      subject: 'Resend Password Reset OTP',
      text: `Your new OTP is ${newOtp}. It is valid for 15 minutes.`,
    });

    res.status(200).json({ message: 'New OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Error resending OTP', error });
  }
};

module.exports = {
  requestPasswordReset,
  verifyOtp,
  resetPassword,
  resendOtp,
};
