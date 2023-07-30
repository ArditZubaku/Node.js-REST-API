const express = require("express");
const routes = require("./routes/userRoutes");
const User = require("./models/user");

const app = express();
const port = process.env.PORT;

async function startServer() {
  try {
    await User.connect();
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
}

startServer();

app.use(express.json());
app.use(routes);

module.exports = app;
