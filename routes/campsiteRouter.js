// Importing required modules
const express = require("express");
const Campsite = require("../models/campsite");
const authenticate = require("../authenticate");

// Creating an Express Router
const campsiteRouter = express.Router();

// Handling requests for /campsites route
campsiteRouter
  .route("/")
  // Handling GET request for all campsites
  .get((req, res, next) => {
    Campsite.find()
      .then((campsites) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsites);
      })
      .catch((err) => next(err));
  })
  // Handling POST request to create a new campsite
  .post(authenticate.verifyUser, (req, res, next) => {
    Campsite.create(req.body)
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
  })
  // Handling PUT request (not supported)
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
  })
  // Handling DELETE request to delete all campsites
  .delete(authenticate.verifyUser, (req, res, next) => {
    Campsite.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

// Handling requests for /campsites/:campsiteId route
campsiteRouter
  .route("/:campsiteId")
  // Handling GET request for a specific campsite
  .get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsite);
      })
      .catch((err) => next(err));
  })
  // Handling POST request (not supported)
  .post(authenticate.verifyUser, (req, res) => {
    res.end(
      `POST operation not supported on /campsites/${req.params.campsiteId}`
    );
  })
  // Handling PUT request to update a specific campsite
  .put(authenticate.verifyUser, (req, res, next) => {
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
  // Handling DELETE request to delete a specific campsite
  .delete(authenticate.verifyUser, (req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

// Handling requests for /campsites/:campsiteId/comments route
campsiteRouter
  .route("/:campsiteId/comments")
  // Handling GET request for comments of a specific campsite
  .get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        if (campsite) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(campsite.comments);
        } else {
          const err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  // Handling POST request to add a new comment to a specific campsite
  .post(authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        if (campsite) {
          campsite.comments.push(req.body);
          campsite
            .save()
            .then((campsite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(campsite);
            })
            .catch((err) => next(err));
        } else {
          const err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  // Handling PUT request (not supported)
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `PUT operation not supported on /campsites/${req.params.campsiteId}/comments`
    );
  })
  // Handling DELETE request to delete all comments of a specific campsite
  .delete(authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        if (campsite) {
          campsite.comments = [];
          campsite
            .save()
            .then((campsite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(campsite);
            })
            .catch((err) => next(err));
        } else {
          const err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

// Handling requests for /campsites/:campsiteId/comments/:commentId route
campsiteRouter
  .route("/:campsiteId/comments/:commentId")
  // Handling GET request for a specific comment of a specific campsite
  .get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(campsite.comments.id(req.params.commentId));
        } else if (!campsite) {
          const err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        } else {
          const err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  // Handling POST request (not supported)
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`
    );
  })
  // Handling PUT request to update a specific comment of a specific campsite
  .put(authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
          if (req.body.rating) {
            campsite.comments.id(req.params.commentId).rating = req.body.rating;
          }
          if (req.body.text) {
            campsite.comments.id(req.params.commentId).text = req.body.text;
          }
          campsite
            .save()
            .then((campsite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(campsite);
            })
            .catch((err) => next(err));
        } else if (!campsite) {
          const err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        } else {
          const err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  // Handling DELETE request to delete a specific comment of a specific campsite
  .delete(authenticate.verifyUser, (req, res, next) => {
    Campsite.findById(req.params.campsiteId)
      .then((campsite) => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
          campsite.comments.id(req.params.commentId).remove();
          campsite
            .save()
            .then((campsite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(campsite);
            })
            .catch((err) => next(err));
        } else if (!campsite) {
          const err = new Error(`Campsite ${req.params.campsiteId} not found`);
          err.status = 404;
          return next(err);
        } else {
          const err = new Error(`Comment ${req.params.commentId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

// Exporting the campsiteRouter for external use
module.exports = campsiteRouter;
