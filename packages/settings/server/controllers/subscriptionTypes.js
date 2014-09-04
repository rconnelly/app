'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  SubscriptionType = mongoose.model('SubscriptionType'),
  _ = require('lodash');


/**
 * Find by id
 */
exports.subscriptionType = function(req, res, next, id) {
  SubscriptionType.load(id, function(err, subscriptionType) {
    if (err) return next(err);
    if (!subscriptionType) return next(new Error('Failed to load subscriptionType ' + id));
    req.subscriptionType = subscriptionType;
    next();
  });
};

/**
 * Create
 */
exports.create = function(req, res) {
  // TODO: Add validation
  var data = req.body;
  var subType = new SubscriptionType(data);

  subType.save(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(subType);
  });
};

/**
 * Update
 */
exports.update = function(req, res) {
  // TODO: Add validation
  var subType = req.subscriptionType;
  subType = _.extend(subType, req.body);
  subType.save(function(err) {
      if (err) {
        return res.json(500, err);
      }
      res.json(subType);
    });
};

/**
 * Delete
 */
exports.destroy = function(req, res) {
  SubscriptionType.remove({_id: req.subscriptionType._id},
    function(err, st) {
    if (err) {
      return res.json(500, err);
    }
    res.json(st);
  });
};

/**
 * Create
 */
exports.create = function(req, res) {
  // TODO: Add validation
  var data = req.body;
  var subType = new SubscriptionType(data);

  subType.save(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(subType);
  });
};

/**
 * Return a list of schedule types
 */
exports.scheduleTypes = function(req, res) {
  // TODO: Add validation
  SubscriptionType.scheduleTypes(function(results){
    res.json(results);
  });
};

/**
 * Return a list of days of month
 */
exports.daysOfMonth = function(req, res) {
  // TODO: Add validation
  SubscriptionType.daysOfMonth(function(results){
    res.json(results);
  });
};

/**
 * Return a list of days of week
 */
exports.daysOfWeek = function(req, res) {
  // TODO: Add validation
  SubscriptionType.daysOfWeek(function(results){
    res.json(results);
  });
};

/**
 * Return a list of months
 */
exports.months = function(req, res) {
  // TODO: Add validation
  SubscriptionType.months(function(results){
    res.json(results);
  });
};

/**
 * Show a subscription type
 */
exports.show = function(req, res) {
  res.json(req.subscriptionType);
};

/**
 * List all
 */
exports.query = function(req, res) {
  var query = {};
  SubscriptionType.find(query).sort('-createdAt').exec(function (err, types) {
    if (err) {
      return res.json(500, err);
    }
    res.json(types);

  });
};
