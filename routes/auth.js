const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Signup route


router.post('/signup', async (req, res) => {
  try {
    const { institute, name, email, password } = req.body;

    if (!institute || !email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email, institute });
    if (existingUser) {
      return res.status(409).json({ message: "User already has an account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);  // Hashing the password

    const user = new User({ institute, name, email, password: hashedPassword });
    await user.save();

    res.status(200).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route


// Login route
router.post('/login', async (req, res) => {
  try {
    const { institute, email, password } = req.body;

    if (!institute || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email, institute });

    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up first." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Set user in session
    req.session.user = user;

    // Log the session ID to console
    console.log("Session ID:", req.sessionID);

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
