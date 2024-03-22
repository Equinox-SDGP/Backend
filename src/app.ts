import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const cron = require("node-cron");

import * as fusionSessionController from "./controllers/fusionSessionController";
import * as spaceDataController from "./controllers/spaceDataController";

import Logger from "js-logger";
import "module-alias/register";

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

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
const spaceRouter = require("./routes/spaceRoutes");
const spaceUpdatesRouter = require("./routes/spaceUpdatesRouter");

// Set up swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup the routes
app.use("/user", userRouter);
app.use("/space", spaceRouter);
app.use("/spaceUpdates", spaceUpdatesRouter);

// Schedule the cron jobs
cron.schedule(
  "*/30 * * * *",
  fusionSessionController.setPeriodicFusionSession,
  {
    scheduled: true,
    timezone: "Asia/Colombo",
  }
);

cron.schedule("0 * * * *", spaceDataController.updateSpaceDataList, {
  scheduled: true,
  timezone: "Asia/Colombo",
});

// Route checking if the server is working
app.get("/", (req, res) => {
  res.send("Hello World!");
  Logger.info("[app] Home route working");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
