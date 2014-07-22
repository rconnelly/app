'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Customer = mongoose.model('Customer'),
  _ = require('lodash');


/**
 * Find customer by id
 */
exports.customer = function(req, res, next, id) {
  Customer.load(id, function(err, article) {
    if (err) return next(err);
    if (!article) return next(new Error('Failed to load customer ' + id));
    req.customer = article;
    next();
  });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
  var customer = new Customer(req.body);

  customer.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the customer' + err
      });
    }
    res.json(customer);

  });
};

/**
 * Update an customer
 */
exports.update = function(req, res) {
  var customer = req.customer;

  customer = _.extend(customer, req.body);

  customer.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the customer'
      });
    }
    res.json(customer);

  });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
  var customer = req.customer;

  customer.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the customer'
      });
    }
    res.json(customer);

  });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
  res.json(req.customer);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
  Customer.find().sort('-created').exec(function(err, customers) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the customers'
      });
    }
    res.json(customers);

  });
};
