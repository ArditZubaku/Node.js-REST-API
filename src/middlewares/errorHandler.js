const ApiError = require("../utils/apiError");
const httpCodes = require("../utils/httpCodes");

// Middleware that is used to handle errors in our API.
const errorHandler = (error, req, res) => {
  const errMessage = error.message || "Internal Server Error!";
  const errCode = error.httpCode || httpCodes.INTERNAL_ERROR;

  const err = new ApiError(errMessage, errCode);

  // Handling wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try Again!!!";
    throw new ApiError(message, httpCodes.BAD_REQUEST);
  }

  // Handling Expired JWT error
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired. Try Again!!!";
    throw new ApiError(message, httpCodes.BAD_REQUEST);
  }

  const errorPayload = { success: false, error: err.message, errCode };

  res.status(err.httpCode).json(errorPayload);

};

// Exports of this file.
module.exports = errorHandler;
