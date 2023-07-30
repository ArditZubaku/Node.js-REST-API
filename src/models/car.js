const {ObjectId} = require("mongodb");
const connectToDatabase = require("../config/database");

class Car {
    constructor(name, price_per_day, year, color, steering_type, number_of_seats, available) {
        this._id = new ObjectId(); // MongoDB's _id will be generated automatically
        this.name = name;
        this.price_per_day = price_per_day;
        this.year = year;
        this.color = color;
        this.steering_type = steering_type;
        this.number_of_seats = number_of_seats
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.available = true;
    }

    static collectionName() {
        return "cars";
    }

    static async connect() {
        const db = await connectToDatabase();
        this.collection = db.collection(this.collectionName());
    }

    static async findAll() {
        const allCars = await this.collection.find({
            available: true
        }).toArray();

        console.log(allCars)

        return allCars.sort((a, b) => a.price_per_day - b.price_per_day);
    }

    static create(car) {
        return this.collection.insertOne(car);
    }

    static filter(filters) {
        const query = {};

        if (filters.year) {
            query.year = parseInt(filters.year);
        }

        if (filters.color) {
            query.color = filters.color;
        }

        if (filters.steering_type) {
            query.steering_type = filters.steering_type;
        }

        if (filters.number_of_seats) {
            query.number_of_seats = parseInt(filters.number_of_seats);
        }

        return this.collection.find(query).toArray();
    }

}

module.exports = Car;
