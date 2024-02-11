import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Logger from "js-logger";

// Load environment variables
require("dotenv").config();

// Create an Express application
const app = express();

// Define a port
const port = process.env.PORT || 3000;
Logger.useDefaults();

// Connecting to the database
mongoose
  .connect(process.env.MONGO_URI || "")
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    console.log("Connected to the database");
  });
  console.log(process.env.MONGO_URI);

// Importing routes modules
const userRouter = require("./routes/userRoutes");

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup the routes
app.use("/user", userRouter);

// Route checking if the server is working
app.get("/", (req, res) => {
  res.send("Hello World!");
  Logger.info("[app] Home route working");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
