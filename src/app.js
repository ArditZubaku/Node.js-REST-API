const express = require("express");
const connectToDatabase = require("./config/database");
const app = express();
const port = process.env.PORT;

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
