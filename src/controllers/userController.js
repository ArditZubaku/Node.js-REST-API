const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");
require("dotenv").config();

const register = catchAsyncErrors(async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    // Simple input validation
    if (!fullName || !email || !username || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // Check if the username is already taken
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: "Username already taken" });
    }

    const newUser = {
      fullName,
      email,
      username,
      password,
    };

    // Save the user to the database
    await User.create(newUser);

    // Generate a JWT token for the user
    const token = generateToken(newUser);
    res.status(201).json({ message: "Registration successful.", token });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Registration failed." });
  }
});

module.exports = { register };
