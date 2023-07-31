const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const verifyToken = catchAsyncErrors(async (token) => {
  return jwt.verify(token, JWT_SECRET);
});

module.exports = verifyToken;
