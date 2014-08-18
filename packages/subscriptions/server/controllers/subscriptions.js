'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Subscription = mongoose.model('Subscription'),
  Item = mongoose.model('Item'),
  SubscriptionPeriod = mongoose.model('SubscriptionPeriod'),
  _ = require('lodash');


/********* MIDDLEWARE ***************/

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
 * Calculate the items in the subscription and return a total.
 * */
exports.calculateTotals = function(req,res)
{
  req.checkBody('subscription.customer', 'Customer must be a string').isAlphanumeric();

  var subscription = req.body;
  Item.calculateTotals(subscription, function(result){
    res.json(result);
  });
};

/********* ACTIONS ***************/

/**
 * Return the end date given
 * */
exports.getEndDate = function(req,res) {
  req.checkQuery('startDate','Start date is must be a date').isDate();
  // TODO: should abstract to custom mongo object id validator
  req.checkQuery('subscriptionPeriodId','Subscription period is required').matches('^[0-9a-fA-F]{24}$'); // check if object id

  var startDate = new Date(req.query.startdate);
  var subscriptionPeriodId = req.query.subscriptionPeriodId;

  SubscriptionPeriod.load(subscriptionPeriodId)
    .then(function(subscriptionPeriod){
      return subscriptionPeriod.getEndDate(startDate);
    })
    .then(function(endDate) {
      res.json(endDate);
    });
};

/********* CRUD ***************/

/**
 * Create an subscription
 */
exports.create = function(req, res) {
  // TODO: Add validation

  var data = req.body;
  if(!!data.customer._id) // convert object to ref
    data.customer = data.customer._id;

  var subscription = new Subscription(data);
  subscription.save(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(subscription);
  });
};

/**
 * Update an subscription
 */
exports.update = function(req, res) {
  // TODO: Add validation

  var subscription = req.subscription;
  subscription = _.extend(subscription, req.body);
  subscription.save(function(err) {
    if (err) {
      return res.json(500, err);
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
      return res.json(500, err);
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
  Subscription.find(query).populate({path: 'customer'}).sort('-createdAt').exec(function (err, subscriptions) {
    if (err) {
      return res.json(500, err);
    }
    res.json(subscriptions);

  });
};
