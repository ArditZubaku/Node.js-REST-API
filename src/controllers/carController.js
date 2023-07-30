const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Car = require("../models/car");

const createCar = catchAsyncErrors(async (req, res) => {
    const {name, price_per_day, year, color, steering_type, number_of_seats} = req.body;

    // Simple input validation
    if (!name || !price_per_day || !year || !color || !steering_type || !number_of_seats) {
        return res.status(400).json({message: "Please fill in all fields."});
    }

    const newCar = new Car(name, price_per_day, year, color, steering_type, number_of_seats);

    // Save the car to the database
    await Car.create(newCar);

    res.status(201).json({message: "Car was created successfully.", newCar});

});

const rentalCars = catchAsyncErrors(async (req, res) => {
    const filters = req.query;

    // Check if there are any query parameters
    if (Object.keys(filters).length === 0) {
        // If no filters are provided, fetch all cars sorted by price_per_day in ascending order
        const allCars = await Car.findAll();

        // Return all cars as a JSON response
        res.status(200).json({
            message: "List of available cars to rent sorted from lowest to highest price:", allCars
        });
    } else {
        // If query parameters are provided, fetch cars with filters
        const cars = await Car.filter(filters);

        res.status(200).json({
            message: "List of filtered cars:", cars
        });
    }

});
module.exports = {createCar, rentalCars};
