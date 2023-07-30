const {JWT_SECRET} = process.env;
const catchAsyncErrors = require("./catchAsyncErrors");
const verifyToken = require("../utils/verifyToken");
const {JsonWebTokenError} = require("jsonwebtoken");

const authenticate = catchAsyncErrors(async (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).send("Missing auth header!");
    }

    const [bearer, token] = authorization.split(" ");
    if (!bearer || bearer !== "Bearer" || !token) {
        return res.status(401).send("Wrong auth header!");
    }

    const decodedToken = verifyToken(token, JWT_SECRET);

    if (decodedToken instanceof JsonWebTokenError) {
        return res.status(401).send("Invalid token format");
    }

    if (!decodedToken) {
        return res.status(401).send("Invalid token");
    }

    req.user = decodedToken;
    return next();
});

module.exports = authenticate;
