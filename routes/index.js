var express = require("express");

// Create an Express Router for handling routes related to the home page
var router = express.Router();

/**
 * @route GET /
 * @description Render the home page.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.get("/", function (req, res, next) {
  // Render the 'index' view and pass the title 'Express' to it
  res.render("index", { title: "Express" });
});

// Export the router to be used in other modules
module.exports = router;
