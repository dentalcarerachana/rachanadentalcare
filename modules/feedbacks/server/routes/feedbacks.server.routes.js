'use strict';

/**
 * Module dependencies.
 */
var feedbacksPolicy = require('../policies/feedbacks.server.policy'),
feedbacks = require('../controllers/feedbacks.server.controller');

module.exports = function (app) {
  // Feeedbacks collection routes
  app.route('/api/feedbacks')
    .get(feedbacks.list)
    .post(feedbacks.create);

  // Single Feeedbacks routes
  app.route('/api/feedbacks/:feedbackId')
    .get(feedbacks.read)
    .put(feedbacks.update)
    .delete(feedbacks.delete);
    

  // Finish by binding the Feeedbacks middleware
  app.param('feedbackId', feedbacks.feedbackByID);
};
