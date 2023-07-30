const {JWT_SECRET} = process.env;
const catchAsyncErrors = require("./catchAsyncErrors")
const verifyToken = require("../utils/verifyToken");

const authenticate = catchAsyncErrors(async (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).send("Missing auth header!");
    }

    const [bearer, token] = authorization.split(" ");
    if (!bearer || bearer !== "Bearer" || !token) {
        return res.status(401).send("Wrong auth header!");
    }

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    req.user = verifyToken(token, JWT_SECRET);
    console.log(req.user)
    // return res.status(401).send("Invalid Token");
    return next();

})

module.exports = authenticate;
