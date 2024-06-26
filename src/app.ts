import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const cron = require("node-cron");

import * as fusionSessionController from "./controllers/fusionSessionController";
import * as spaceDataController from "./controllers/spaceDataController";
import * as spaceUpdatesController from "./controllers/spaceUpdatesController";

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

// Importing routes modules
const userRouter = require("./routes/userRoutes");
const spaceRouter = require("./routes/spaceRoutes");
const spaceUpdatesRouter = require("./routes/spaceUpdatesRouter");
const chatbotRouter = require("./routes/chatbotRouter");

// Set up swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup the routes
app.use("/user", userRouter);
app.use("/space", spaceRouter);
app.use("/spaceUpdates", spaceUpdatesRouter);
app.use("/chatbot", chatbotRouter);

// Schedule the cron jobs
cron.schedule(
  "*/30 * * * *",
  fusionSessionController.setPeriodicFusionSession,
  {
    scheduled: true,
    timezone: "Asia/Colombo",
  }
);

cron.schedule("*/55 * * * *", spaceDataController.updateSpaceDataListByTime, {
  scheduled: true,
  timezone: "Asia/Colombo",
});

cron.schedule("0 * * * *", spaceUpdatesController.hourlySpaceUpdates, {
  scheduled: true,
  timezone: "Asia/Colombo",
});

cron.schedule("0 0 * * *", spaceUpdatesController.dailySpaceUpdates, {
  scheduled: true,
  timezone: "Asia/Colombo",
});

cron.schedule("0 0 * * *", spaceUpdatesController.monthlySpaceUpdates, {
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
