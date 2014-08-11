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
 * User Schema
 */
var InvoiceSchema = new Schema({
  account: {
    type: ObjectId,
    ref: 'Account'
  },
  customer: {
    type: ObjectId,
    required: true,
    ref: 'Customer'
  },
  subscription: {
    type: ObjectId,
    ref: 'Subscription'
  },
  terms: {
    type: ObjectId,
    required: true,
    ref: 'InvoiceTerms'
  },
  message: {
    type: String
  },
  memo: {
    type: String
  },
  items: []
});

/** Statics */
InvoiceSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

InvoiceSchema.statics.getDefaultDueDate = function(startDate, terms, cb) {
};

/**
 * Plugins
 */

mongoose.model('Invoice', InvoiceSchema);

InvoiceSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );