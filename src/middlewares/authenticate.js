const { JWT_SECRET } = process.env;
const catchAsyncErrors = require("./catchAsyncErrors");
const verifyToken = require("../utils/verifyToken");
const { JsonWebTokenError } = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const httpCodes = require("../utils/httpCodes");

const authenticate = catchAsyncErrors(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new ApiError("Missing auth header", httpCodes.UNAUTHORIZED));
    return;
  }

  const [bearer, token] = authorization.split(" ");
  if (!bearer || bearer !== "Bearer" || !token) {
    next(new ApiError("Wrong auth header", httpCodes.UNAUTHORIZED));
    return;
  }

  const decodedToken = await verifyToken(token, JWT_SECRET);

  if (decodedToken instanceof JsonWebTokenError) {
    next(new ApiError("Invalid token format", httpCodes.UNAUTHORIZED));
    return;
  }

  req.user = decodedToken;
  return next();
});

module.exports = authenticate;
