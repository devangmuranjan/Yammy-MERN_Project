const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const jwtSecret = "TeraBapkadadakaSabKaBadalaLega"  // Secret for JWT token
const bcrypt = require("bcryptjs");

// Route to create a new user
router.post(
  "/createuser",
  [
    body("name", "name is of 15 char only").isLength({ min: 3 }),  // Validation for name
    body("email", "email is not valid").isEmail(),  // Validation for email
    body("location").isLength({ min: 3 }),  // Validation for location
    body("password", "incorrect password").isLength({ min: 3 }),  // Validation for password
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Return validation errors
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
      await User.create({
        name: req.body.name,
        location: req.body.location,
        password: hashedPassword,
        email: req.body.email,
      });
      
      res.json({ success: true });  // Return success message
    } catch (error) {
      console.log(error);
      res.json({ success: false });  // Return failure message
    }
  }
);

// Route to login a user
router.post(
  "/loginuser",
  [
    body("email", "email is not valid").isEmail(),  // Validation for email
    body("password", "incorrect password").isLength({ min: 3 }),  // Validation for password
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Return validation errors
    }

    let email = req.body.email;
    try {
      const UserData = await User.findOne({ email });

      if (!UserData) {
        return res
          .status(400)
          .json({ errors: "login with correct email and password" });  // Return error message if user not found
      }

      const pwdCompare = await bcrypt.compare(req.body.password, UserData.password);  // Compare hashed password
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "login with correct email and password" });  // Return error message if password incorrect
      }

      const data = {
        id: UserData._id
      };
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authToken });  // Return success message and JWT token
    } catch (error) {
      console.log(error);
      res.json({ success: false });  // Return failure message
    }
  }
);

module.exports = router;
