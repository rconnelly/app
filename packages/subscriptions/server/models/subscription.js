'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-times'),
  PriceItem = require('../../../customers/server/models/priceitem').Schema,
  ObjectId = mongoose.Schema.Types.ObjectId,
  BD = require('bigdecimal'),
  _ = require('lodash');

/**
 * Validations
 */

/**
 *  Schema
 */
var SubscriptionSchema = new Schema({
  customer: {
    type: ObjectId,
    required: true,
    ref: 'Customer'
  },
  priceItems: [PriceItem],
  startDate: {
    type: Date,
    required: true
  },
  items: [
    {
      name: {
        type: String,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      revRecTemplate: {
        type: String,
        required: true
      }
    }]
});

/** Calculates extended prices and total of a subscription object */
SubscriptionSchema.statics.calculateTotals = function (subscription) {
  var mathContext = BD.MathContext.DECIMAL64(); // half even rounding
  var total = new BD.BigDecimal(0, mathContext);
  _.forEach(subscription.items, function(item) {
    var price = new BD.BigDecimal(item.price || 0, mathContext);
    var qty = new BD.BigDecimal(item.qty || 0, mathContext);
    var extended = price.multiply(qty);
    total = total.add(extended);
    extended.setScale(2);
    item.extended = extended.longValue();
  });
  total.setScale(2);
  subscription.total = total.longValue();
};

SubscriptionSchema.statics.billingSchedules = function (cb) {
  cb(['Monthly', 'Quarterly', 'Yearly']);
};

/** Statics */
SubscriptionSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate({path: 'customer'}).exec(cb);
};

SubscriptionSchema.statics.query = function (cb) {
  this.find().populate({path: 'customer'}).exec(cb);
};

/**
 * Plugins
 */

mongoose.model('Subscription', SubscriptionSchema);

SubscriptionSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );