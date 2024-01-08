var express = require("express");

// Create an Express Router for handling user-related routes
var router = express.Router();

/**
 * @route GET /users
 * @description Respond with a resource when a GET request is made to "/users".
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.get("/", function (req, res, next) {
  // Send a response with the message 'respond with a resource'
  res.send("respond with a resource");
});

// Export the router to be used in other modules
module.exports = router;
