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
  invoiceDate: {
    type: Date,
    required: true
  },
  invoiceNumber: {
    type: String
  },
  message: {
    type: String
  },
  memo: {
    type: String
  },
  total: {
    type: Number
  },
  items: []
});

/** Statics */
InvoiceSchema.statics.load = function(id, cb) {
  return this.findOne({
    _id: id
  }).populate({path: 'customer'}).exec(cb);
};

InvoiceSchema.statics.getDefaultDueDate = function(startDate, terms, cb) {

};

/**
 * Middleware
 */

/**
 * Plugins
 */

mongoose.model('Invoice', InvoiceSchema);

InvoiceSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );