"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const js_logger_1 = __importDefault(require("js-logger"));
// Load environment variables
require("dotenv").config();
// Create an Express application
const app = (0, express_1.default)();
// Define a port
const port = process.env.PORT || 3000;
js_logger_1.default.useDefaults();
// Connecting to the database
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .catch((err) => {
    console.log(err);
})
    .then(() => {
    console.log("Connected to the database");
});
// Importing routes modules
const userRouter = require("./routes/userRoutes");
// Set up body-parser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Setup the routes
app.use("/user", userRouter);
// Route checking if the server is working
app.get("/", (req, res) => {
    res.send("Hello World!");
    js_logger_1.default.info("[app] Home route working");
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
exports.default = app;
