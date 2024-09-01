const express=require("express");
const router=express.Router()

const { registerUser } = require("../controllers/registerController.js");
const { loginUser } = require("../controllers/loginController.js");
const { requestPasswordReset,
  verifyOtp,
  resetPassword,
  resendOtp,}=require("../controllers/forgetpassword.js")



router.get("/get", (req, res) => {
    res.send("Hello from the root route of the dummy router!");
  });
  router.post("/register",registerUser)
  router.post("/login",loginUser)


  router.post("/requestPasswordReset",requestPasswordReset)
  router.post("/verifyOtp",verifyOtp)
  router.post("/resetPassword",resetPassword)
  router.post("/resendOtp",resendOtp)
  
  

module.exports=router
