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
    required: true,
    ref: 'Customer'
  },
  priceItems: [PriceItem],
  startDate: {
    type: Date,
    required: true
  },
  invoiceMessage: {
    type: String
  },
  memo: {
    type: String
  },
  subscriptionType: { // FIXME: should change to a ref
    name: {
      type: String,
      required: true
    }
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