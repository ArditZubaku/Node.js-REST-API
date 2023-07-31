class ApiError extends Error {
  constructor(message, httpCode) {
    super(message);

    this.httpCode = httpCode;

    Error.captureStackTrace(this, ApiError);
  }
}

module.exports = ApiError;
