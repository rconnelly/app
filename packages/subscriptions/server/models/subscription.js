'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-times'),
  PriceItem = require('../../../customers/server/models/priceitem').Schema,
  ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Validations
 */

/**
 *  Schema
 */
var SubscriptionSchema = new Schema({
  customer: {
    type: ObjectId,
    required: true
  },
  priceItems: [PriceItem],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

/** Statics */
SubscriptionSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

SubscriptionSchema.statics.query = function (name, cb) {
  this.find({ name: new RegExp(name, 'i') }, cb);
};


/**
 * Plugins
 */

mongoose.model('Subscription', SubscriptionSchema);

SubscriptionSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );