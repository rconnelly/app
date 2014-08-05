'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Subscription = mongoose.model('Subscription'),
  _ = require('lodash');


/**
 * Find subscription by id
 */
exports.subscription = function(req, res, next, id) {
  Subscription.load(id, function(err, subscription) {
    if (err) return next(err);
    if (!subscription) return next(new Error('Failed to load subscription ' + id));
    req.subscription = subscription;
    next();
  });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
  var subscription = new Subscription(req.body);
  subscription.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the subscription' + err
      });
    }
    res.json(subscription);
  });
};

/**
 * Update an subscription
 */
exports.update = function(req, res) {
  var subscription = req.subscription;
  subscription = _.extend(subscription, req.body);
  subscription.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the subscription ' + err
      });
    }
    res.json(subscription);

  });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
  var subscription = req.subscription;

  subscription.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the subscription'
      });
    }
    res.json(subscription);
  });
};

/**
 * Show an subscription
 */
exports.show = function(req, res) {
  res.json(req.subscription);
};

exports.billingSchedules = function(req, res) {
  Subscription.billingSchedules(function(terms) {
    res.json(terms);
  });
};

/**
 * List of subscriptions
 */
exports.query = function(req, res) {
  var query = {};
  if (!!req.query.name) {
    query = { name: new RegExp(req.query.name, 'i') };
  }
  Subscription.find(query).sort('-createdAt').exec(function (err, subscriptions) {
    if (err) {
      return res.json(500, err);
    }
    res.json(subscriptions);

  });
};
