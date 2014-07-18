'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  PricePlan = mongoose.model('PricePlan');
  //_ = require('lodash');


/**
 * Create an price plan
 */
exports.create = function(req, res) {
  var pricePlan = new PricePlan(req.body);

  pricePlan.save(function(err) {
    if (err) {
      return res.json(400, err);
    }
    res.json(pricePlan);

  });
};