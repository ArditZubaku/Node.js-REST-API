const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");
require("dotenv").config();

const register = catchAsyncErrors(async (req, res) => {
    const {fullName, email, username, password} = req.body;

    // Simple input validation
    if (!fullName || !email || !username || !password) {
        return res.status(400).json({message: "Please fill in all fields."});
    }

    // Check if the username is already taken
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
        return res.status(409).json({error: "Username already taken"});
    }

    const newUser = new User(fullName, email, username, password);

    // Save the user to the database
    await User.create(newUser);

    // Generate a JWT token for the user
    const token = generateToken(newUser);
    res.status(201).json({message: "Registration successful.", token});

});

const login = catchAsyncErrors(async (req, res) => {

    const {username, password} = req.body;

    // Simple input validation
    if (!username || !password) {
        return res.status(400).json({message: 'Please provide username and password.'});
    }

    // Check if the user with the provided username exists in the database
    const user = await User.findByUsername(username);
    if (!user) {
        return res.status(404).json({message: 'User not found.'});
    }

    const validPassword = await User.comparePasswords(password, user.password);
    if (!validPassword) {
        return res.status(401).json({message: 'Invalid credentials.'});
    }

    // Generate a JWT token for the user
    const token = generateToken(user);

    res.status(201).json({message: 'Logged in successfully.', token});

});

const myProfile = catchAsyncErrors(async (req, res) => {
    const {fullName, username, email} = req.user;

    if (!req.user) return res.status(401).json({message: "User not authenticated."});

    const profile = {fullName, username, email};

    // Return the user's profile information
    return res.status(200).json({message: "User's information:", profile});
});
module.exports = {register, login, myProfile};
