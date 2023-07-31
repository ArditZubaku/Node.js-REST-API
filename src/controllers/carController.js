const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Car = require("../models/car");
const ApiError = require("../utils/apiError");
const httpCodes = require("../utils/httpCodes");

const createCar = catchAsyncErrors(async (req, res, next) => {
  const { name, price_per_day, year, color, steering_type, number_of_seats } =
    req.body;

  // Simple input validation
  if (
    !name ||
    !price_per_day ||
    !year ||
    !color ||
    !steering_type ||
    !number_of_seats
  ) {
    next(new ApiError("Please fill in all fields.", httpCodes.BAD_REQUEST));
    return;
  }

  const car = new Car(
    name,
    price_per_day,
    year,
    color,
    steering_type,
    number_of_seats
  );

  // Save the car to the database
  const newCar = await Car.create(car);
  if (!newCar) {
    next(new ApiError("Failed to create car!", httpCodes.INTERNAL_ERROR));
    return;
  }

  res
    .status(httpCodes.CREATED)
    .json({ message: "Car was created successfully.", newCar });
});

const rentalCars = catchAsyncErrors(async (req, res, next) => {
  const filters = req.query;

  // Check if there are any query parameters
  if (Object.keys(filters).length === 0) {
    // If no filters are provided, fetch all cars sorted by price_per_day in ascending order
    const allCars = await Car.findAll();
    if (!allCars) {
      next(new ApiError("Cars not found!", httpCodes.NOT_FOUND));
      return;
    }

    // Return all cars as a JSON response
    res.status(httpCodes.OK).json({
      message:
        "List of available cars to rent sorted from lowest to highest price:",
      allCars,
    });
  } else {
    // Check for invalid query parameters
    const invalidKeys = Object.keys(filters).filter(
      (key) =>
        key !== "year" &&
        key !== "color" &&
        key !== "steering_type" &&
        key !== "number_of_seats"
    );

    if (invalidKeys.length > 0) {
      next(new ApiError("Invalid query parameters.", httpCodes.BAD_REQUEST));
      return;
    }

    // If query parameters are valid, fetch cars with filters
    const cars = await Car.filter(filters);
    if (!cars) {
      next(new ApiError("Cars not found!", httpCodes.NOT_FOUND));
      return;
    }

    res.status(httpCodes.OK).json({
      message: "List of filtered cars:",
      cars,
    });
  }
});

module.exports = { createCar, rentalCars };
