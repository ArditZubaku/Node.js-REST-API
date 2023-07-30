const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;

const generateToken = (user) => {
    const {id, full_name: fullName, email, username} = user
    return jwt.sign({
        id, fullName, email, username
    }, JWT_SECRET, {expiresIn: "1h"});
}

module.exports = generateToken;
