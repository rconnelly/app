'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-times'),
  BD = require('bigdecimal'),
  _ = require('lodash');

/**
 * Validations
 */

/**
 * User Schema
 */
var ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  revRecTemplate: {
    type: String,
    required: true
  },
  setupFee: {
    type: Number,
    default: 0
  },
  recurringPeriod: {
    type: Number,
    required: true
  },
  recurringPeriodType: {
   type: String,
    required: true
  }
});

/** Statics */
ItemSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

ItemSchema.statics.query = function (query, cb) {
  var q = {};
  if(!!query.name) {
    q.name = new RegExp(query.name, 'i');
  }

  if(!!query.term){
    q.term = query.term;
  }
  return this.find(q, cb);
};

/** Calculates extended prices and total of a item collection.
 *  An item collection is any object with an item array property. */
ItemSchema.statics.calculateTotals = function (itemCollection) {
  var mathContext = BD.MathContext.DECIMAL64(); // half even rounding
  var total = new BD.BigDecimal(0, mathContext);
  _.forEach(itemCollection.items, function(item) {
    var price = new BD.BigDecimal(item.price || 0, mathContext);
    var qty = new BD.BigDecimal(item.qty || 0, mathContext);
    var extended = price.multiply(qty);
    total = total.add(extended);
    extended.setScale(2);
    item.extended = extended.longValue();
  });
  total.setScale(2);
  itemCollection.total = total.longValue();
};

ItemSchema.statics.interval = function (cb) {
  cb(['Once', 'Monthly', 'Bi-Monthly','Quarterly','Yearly']);
};

ItemSchema.statics.terms = function (cb) {
  cb(['Once', 'Monthly', 'Bi-Monthly','Quarterly','Yearly']);
};

ItemSchema.statics.revRecTemplates = function (cb) {
  cb(['Once', '12 Month', 'Evenly Applied']);
};

/**
 * Plugins
 */

mongoose.model('Item', ItemSchema);

module.exports.Schema = ItemSchema;

ItemSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );