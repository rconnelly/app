'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  PriceItem = mongoose.model('PriceItem'),
  Customer = mongoose.model('Customer');

/**
 * Create a price item
 */
exports.create = function(req, res) {
  var data = req.body;
  data.item = data.item._id;
  var priceItem = new PriceItem(data);
  var customer = req.customer;
  var item = customer.priceItems.push(priceItem);
  customer.save(function(err) {
    if (err) {
      return res.json(500, err);
    }
    res.json(item);
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