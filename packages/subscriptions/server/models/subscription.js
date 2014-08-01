'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-times'),
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
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  term: {
    type: String,
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