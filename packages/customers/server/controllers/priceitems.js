'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  PriceItem = mongoose.model('PriceItem'),
  Customer = mongoose.model('Customer'),
  _ = require('lodash');

/**
 * Create a price item
 */
exports.create = function(req, res) {
  var data = req.body;
  if(!!data.item._id) // convert object to ref
    data.item = data.item._id;

  var priceItem = new PriceItem(data);
  var customer = req.customer;

  customer.priceItems.push(priceItem);
  customer.save(function (err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(priceItem);
  });
};

/**
 * List of price items
 */
exports.all = function(req, res) {
  var customer = req.customer;
  Customer.findOne(customer._id).populate({path: 'priceItems.item'}).sort('-createdAt').exec(function(err, customer) {
    if (err) {
      return res.json(500, err);
    }
    res.json(customer.priceItems);
  });
};

/**
 * Update an price item
 */
exports.update = function(req, res) {
  var customer = req.customer;
  var data = req.body;
  if(data.item._id)
    data.item = data.item._id;

  var priceItem = customer.priceItems.id(data._id);
  priceItem = _.extend(priceItem, data);

  customer.save(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(priceItem);
  });
};

/**
 * Delete an price item
 */
exports.destroy = function(req, res) {
  var customer = req.customer;
  var priceItem = customer.priceItems.id(req.params.priceId).remove();
  customer.save(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(priceItem);
  });
};

/**
 * Show price item
 */
exports.show = function(req, res) {
  var customer = req.customer;
  var priceId = req.params.priceId;
  Customer.findOne(customer._id).populate({path: 'priceItems.item'}).exec(function(err, customer) {
    if (err) {
      return res.json(500, err);
    }
    res.json(customer.priceItems.id(priceId));

  });
};