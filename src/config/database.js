const { MongoClient, MongoServerError} = require("mongodb");
require("dotenv").config();

const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;

const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(url);
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    if (error instanceof MongoServerError)
      console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectToDatabase;
