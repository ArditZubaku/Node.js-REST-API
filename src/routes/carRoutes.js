// routes/carRoutes.js

const express = require("express");
const router = express.Router();
const {createCar, rentalCars} = require("../controllers/carController");
// const authenticate = require("../middlewares/authenticate");

// In the task it was not required to authenticate these routes, but I think you should be logged in first in order
// to be able to filter or create any car.
router.post("/create-car", /*authenticate,*/ createCar)
router.get("/rental-cars", /*authenticate,*/ rentalCars);

module.exports = router;
