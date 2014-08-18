'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-times');

/**
 * Validations
 */

/**
 *  Schema
 */
var SubscriptionPeriodSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

/** Statics */
SubscriptionPeriodSchema.statics.load = function(id, cb) {
  return this.findOne({
    _id: id
  }).exec(cb);
};

SubscriptionPeriodSchema.statics.query = function (cb) {
  return this.find().populate({path: 'customer'}).exec(cb);
};

/** Instance Methods */
SubscriptionPeriodSchema.methods.endDate = function(startDate, cb){
  var p = new Promise();

  // TODO: FIX ME
  if(!!cb)
    cb(startDate);

  p.fulfill(startDate);

  return p;
};

/**
 * Plugins
 */

mongoose.model('SubscriptionPeriod', SubscriptionPeriodSchema);

SubscriptionPeriodSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );