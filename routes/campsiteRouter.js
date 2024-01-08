const express = require("express");
const Campsite = require("../models/campsite");

// Create an Express Router for handling campsite-related routes
const campsiteRouter = express.Router();

/**
 * Middleware for handling common tasks for all routes on "/campsites"
 */
campsiteRouter
  .route("/")
  /**
   * GET request handler for retrieving all campsites.
   * Responds with a JSON array of campsites.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {function} next - Express next middleware function.
   */
  .get((req, res, next) => {
    Campsite.find()
      .then((campsites) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsites);
      })
      .catch((err) => next(err));
  })
  /**
   * POST request handler for creating a new campsite.
   * Responds with a JSON object of the created campsite.
   *
   * @param {Object} req - Express request object containing the new campsite data.
   * @param {Object} res - Express response object.
   * @param {function} next - Express next middleware function.
   */
  .post((req, res, next) => {
    Campsite.create(req.body)
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
  })
  /**
   * PUT request handler for updating campsites.
   * Responds with an error message for unsupported PUT requests on "/campsites".
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
  })
  /**
   * DELETE request handler for deleting all campsites.
   * Responds with a JSON object containing the delete operation response.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {function} next - Express next middleware function.
   */
  .delete((req, res, next) => {
    Campsite.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

/**
 * Middleware for handling common tasks for all routes on "/campsites/:campsiteId"
 */
campsiteRouter
  .route("/:campsiteId")
  /**
   * GET request handler for retrieving a specific campsite by ID.
   * Responds with a JSON object of the requested campsite.
   *
   * @param {Object} req - Express request object containing the campsite ID.
   * @param {Object} res - Express response object.
   * @param {function} next - Express next middleware function.
   */
  .get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
  })
  /**
   * POST request handler for unsupported POST requests on "/campsites/:campsiteId".
   * Responds with an error message.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  .post((req, res) => {
    res.end(
      `POST operation not supported on /campsites/${req.params.campsiteId}`
    );
  })
  /**
   * PUT request handler for updating a specific campsite by ID.
   * Responds with a JSON object of the updated campsite.
   *
   * @param {Object} req - Express request object containing the campsite ID and updated data.
   * @param {Object} res - Express response object.
   * @param {function} next - Express next middleware function.
   */
  .put((req, res, next) => {
    Campsite.findByIdAndUpdate(
      req.params.campsiteId,
      { $set: req.body },
      { new: true }
    )
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
  })
  /**
   * DELETE request handler for deleting a specific campsite by ID.
   * Responds with a JSON object containing the delete operation response.
   *
   * @param {Object} req - Express request object containing the campsite ID.
   * @param {Object} res - Express response object.
   * @param {function} next - Express next middleware function.
   */
  .delete((req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

// Export the campsiteRouter to be used in other modules
module.exports = campsiteRouter;
