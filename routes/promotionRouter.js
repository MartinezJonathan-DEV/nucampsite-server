const express = require("express");

// Create an Express Router for handling promotion-related routes
const promotionRouter = express.Router();

// Middleware for handling common tasks for all routes on "/promotions"
promotionRouter
  .route("/")
  .all((req, res, next) => {
    // Set the response status code and content type
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    // Respond with a message when a GET request is made to "/promotions"
    res.end("Will send all the promotions to you");
  })
  .post((req, res) => {
    // Respond with a message when a POST request is made to "/promotions"
    res.end(
      `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    // Respond with an error message for unsupported PUT requests on "/promotions"
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete((req, res) => {
    // Respond with a message when a DELETE request is made to "/promotions"
    res.end("Deleting all promotions");
  });

// Middleware for handling common tasks for all routes on "/promotions/:promotionId"
promotionRouter
  .route("/:promotionId")
  .all((req, res, next) => {
    // Set the response status code and content type
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    // Respond with a message including the promotionId when a GET request is made to "/promotions/:promotionId"
    res.end(`Will send promotion: ${req.params.promotionId}`);
  })
  .post((req, res) => {
    // Respond with an error message for unsupported POST requests on "/promotions/:promotionId"
    res.end(
      `POST operation not supported on /promotions/${req.params.promotionId}`
    );
  })
  .put((req, res) => {
    // Respond with a message including the promotionId and updated information when a PUT request is made to "/promotions/:promotionId"
    res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    res.end(
      `Will update the promotion: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    // Respond with a message including the promotionId when a DELETE request is made to "/promotions/:promotionId"
    res.end(`Deleting promotion: ${req.params.promotionId}`);
  });

// Export the promotionRouter to be used in other modules
module.exports = promotionRouter;
