const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function generateToken(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
}

module.exports = generateToken;
