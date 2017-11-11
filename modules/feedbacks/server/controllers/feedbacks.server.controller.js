'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Feedback = mongoose.model('Feedback'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a feedback
 */
exports.create = function (req, res) {
  var feedback = new Feedback(req.body);
  feedback.user = req.user;

  feedback.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(feedback);
    }
  });
};

/**
 * Show the current feedback
 */
exports.read = function (req, res) {
  res.json(req.feedback);
};

/**
 * Update a feedback   
 */
exports.update = function (req, res) {
  var feedback = req.feedback;

  feedback.feedbackPatName = req.body.feedbackPatName;
  feedback.feedbackDoctorName = req.body.feedbackDoctorName;
  feedback.feedbackNatureTreatment = req.body.feedbackNatureTreatment;
  feedback.feedbackAmbience = req.body.feedbackAmbience;
  feedback.feedbackExperience = req.body.feedbackExperience;
  feedback.feedbackHyegine = req.body.feedbackHyegine;
  feedback.feedbackHandling = req.body.feedbackHandling;
  feedback.feedbackManners = req.body.feedbackManners;
  feedback.feedbackCommunication = req.body.feedbackCommunication;
  feedback.feedbackExplainProblemPlan = req.body.feedbackExplainProblemPlan;
  feedback.feedbackTreatmentExplainClearly = req.body.feedbackTreatmentExplainClearly;
  feedback.feedbackSatisfiedTreatment = req.body.feedbackSatisfiedTreatment;
  feedback.feedbackRecomendClinic = req.body.feedbackRecomendClinic;
  feedback.feedbackSuggestionImprovement = req.body.feedbackSuggestionImprovement;
  feedback.feedbackRating = req.body.feedbackRating;
  


  feedback.save(function (err) { 
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(feedback);
    }
  });
};

/**
 * Delete an Feedback
 */
exports.delete = function (req, res) {
  var feedback = req.feedback;

  feedback.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(feedback);
    }
  });
};

/**
 * List of Feedback
 */
exports.list = function (req, res) {
  Feedback.find().exec(function (err, feedback) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(feedback);
    }
  });
};


/**
 * Appt Type middleware
 */
exports.feedbackByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Feedback is invalid'
    });
  }

  Feedback.findById(id).exec(function (err, feedback) {
    if (err) {
      return next(err);
    } else if (!feedback) {
      return res.status(404).send({
        message: 'No feedback with that identifier has been found'
      });
    }
    req.feedback = feedback;
    next();
  });
};