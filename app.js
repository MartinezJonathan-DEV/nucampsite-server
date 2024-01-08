const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Importing route modules
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const campsiteRouter = require("./routes/campsiteRouter");
const promotionRouter = require("./routes/promotionRouter");
const partnerRouter = require("./routes/partnerRouter");

const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/nucampsite";

// Connect to the MongoDB server with specified options
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB connection status
connect.then(
  () => console.log("Connected correctly to the server"),
  (err) => console.error("Error connecting to the server:", err)
);

// Create an Express application
const app = express();

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middleware for logging requests in development
app.use(logger("dev"));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for handling cookies
app.use(cookieParser());

// Middleware for serving static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Registering route handlers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/campsites", campsiteRouter);
app.use("/promotions", promotionRouter);
app.use("/partners", partnerRouter);

// Middleware for handling 404 errors
app.use(function (req, res, next) {
  next(createError(404));
});

// Error-handling middleware
app.use(function (err, req, res, next) {
  // Set locals, providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Export the app to be used in other modules
module.exports = app;
