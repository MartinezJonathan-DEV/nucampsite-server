const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const passport = require("passport");
const config = require("./config");

// Importing route modules
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const campsiteRouter = require("./routes/campsiteRouter");
const promotionRouter = require("./routes/promotionRouter");
const partnerRouter = require("./routes/partnerRouter");

const mongoose = require("mongoose");

const url = config.mongoUrl;

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

app.all("*", (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    console.log(
      `Redirecting to https://${req.hostname}:${app.get("secPort")}${req.url}`
    );
    res.redirect(
      301,
      `https://${req.hostname}:${app.get("secPort")}${req.url}`
    );
  }
});

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middleware for logging requests in development
app.use(logger("dev"));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Middleware for serving static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Registering route handlers
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
