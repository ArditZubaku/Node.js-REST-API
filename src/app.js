const express = require("express");
const connectToDatabase = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const User = require("./models/user");
const authenticate = require("./middlewares/authenticate");
const Car = require("./models/car");
const handleMiddleware = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT;

async function startServer() {
  try {
    const mongodb = await connectToDatabase();

    await User.connect(mongodb);
    await Car.connect(mongodb);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

startServer();

app.use(express.json());
app.use(userRoutes);
app.use(carRoutes);
app.use(authenticate);
app.use(handleMiddleware);

module.exports = app;
