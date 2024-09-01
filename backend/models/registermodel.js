const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      trim: true,
      required: [true, "First Name is required"], 
    },
    LastName: {
      type: String,
      trim: true, 
      required: [true, "Last Name is required"], 
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, 
      lowercase: true, 
      match: [/.+@.+\..+/, "Please enter a valid email address"], 
    },
    Password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"], 
    },
    Otp: {
      type: String,
    },
    otpCreatedAt:{
      type:String
    }
  },
  {
    timestamps: true, 
  }
);


module.exports = mongoose.model("User", RegisterSchema);
