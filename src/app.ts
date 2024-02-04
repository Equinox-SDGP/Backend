import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Load environment variables
require("dotenv").config();

// Create an Express application
const app = express();

// Define a port
const port = process.env.PORT || 3000;

// Connecting to the database
mongoose.connect(process.env.MONGO_URI || "").catch((err) => {
  console.log(err);
});

// Importing routes modules
const userRouter = require("./routes/userRoutes");

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup the routes
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Route working");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
