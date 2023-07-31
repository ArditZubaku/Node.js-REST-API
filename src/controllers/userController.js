const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user");
const ApiError = require("../utils/apiError");
const httpCodes = require("../utils/httpCodes");
const generateToken = require("../utils/generateToken");
require("dotenv").config();

const register = catchAsyncErrors(async (req, res, next) => {
  const { fullName, email, username, password } = req.body;

  // Simple input validation
  if (!fullName || !email || !username || !password) {
    next(new ApiError("Please fill in all fields.", httpCodes.BAD_REQUEST));
    return;
  }

  // Check if the username is already taken
  const existingUser = await User.findByUsername(username);
  if (existingUser) {
    next(new ApiError("User already exists!", httpCodes.BAD_REQUEST));
    return;
  }

  const user = new User(fullName, email, username, password);

  // Save the user to the database
  const newUser = await User.create(user);
  if (!newUser) {
    next(new ApiError("Failed to create user!", httpCodes.INTERNAL_ERROR));
    return;
  }

  // Generate a JWT token for the user
  const token = await generateToken(newUser);

  if (!token) {
    next(new ApiError("Failed to generate token.", httpCodes.INTERNAL_ERROR));
    return;
  }
  res
    .status(httpCodes.CREATED)
    .json({ message: "Registration successful.", token });
});

const login = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;

  // Simple input validation
  if (!username || !password) {
    next(
      new ApiError(
        "Please provide username and password.",
        httpCodes.BAD_REQUEST
      )
    );
    return;
  }

  // Check if the user with the provided username exists in the database
  const user = await User.findByUsername(username);
  if (!user) {
    next(new ApiError("Invalid Credentials!", httpCodes.UNAUTHORIZED));
    return;
  }

  const validPassword = await User.comparePasswords(password, user.password);
  if (!validPassword) {
    next(new ApiError("Invalid Credentials!", httpCodes.UNAUTHORIZED));
    return;
  }

  // Generate a JWT token for the user
  const token = await generateToken(user);
  if (!token) {
    next(new ApiError("Failed to generate token.", httpCodes.INTERNAL_ERROR));
    return;
  }

  res.status(httpCodes.OK).json({ message: "Logged in successfully.", token });
});

const myProfile = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    next(new ApiError("User not authenticated.", httpCodes.UNAUTHORIZED));
    return;
  }

  const { fullName, username, email } = req.user;
  const profile = { fullName, username, email };

  // Return the user's profile information
  return res
    .status(httpCodes.OK)
    .json({ message: "User's information:", profile });
});

module.exports = { register, login, myProfile };
