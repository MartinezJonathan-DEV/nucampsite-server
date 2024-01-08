const express = require("express");

// Create an Express Router for handling partner-related routes
const partnerRouter = express.Router();

// Middleware for handling common tasks for all routes on "/partners"
partnerRouter
  .route("/")
  .all((req, res, next) => {
    // Set the response status code and content type
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    // Respond with a message when a GET request is made to "/partners"
    res.end("Will send all the partners to you");
  })
  .post((req, res) => {
    // Respond with a message when a POST request is made to "/partners"
    res.end(
      `Will add the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    // Respond with an error message for unsupported PUT requests on "/partners"
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete((req, res) => {
    // Respond with a message when a DELETE request is made to "/partners"
    res.end("Deleting all partners");
  });

// Middleware for handling common tasks for all routes on "/partners/:partnerId"
partnerRouter
  .route("/:partnerId")
  .all((req, res, next) => {
    // Set the response status code and content type
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    // Respond with a message including the partnerId when a GET request is made to "/partners/:partnerId"
    res.end(`Will send partner: ${req.params.partnerId}`);
  })
  .post((req, res) => {
    // Respond with an error message for unsupported POST requests on "/partners/:partnerId"
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })
  .put((req, res) => {
    // Respond with a message including the partnerId and updated information when a PUT request is made to "/partners/:partnerId"
    res.write(`Updating the partner: ${req.params.partnerId}\n`);
    res.end(
      `Will update the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    // Respond with a message including the partnerId when a DELETE request is made to "/partners/:partnerId"
    res.end(`Deleting partner: ${req.params.partnerId}`);
  });

// Export the partnerRouter to be used in other modules
module.exports = partnerRouter;
