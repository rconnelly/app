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
var InvoiceTermsSchema = new Schema({
  account: {
    type: ObjectId,
    ref: 'Account'
  },
  name: {
    type: String
  },
  fixedDays: {
    type: Number
  }
});

/** Statics */
InvoiceTermsSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

InvoiceTermsSchema.statics.getDefaultDueDate = function(startDate, terms, cb) {
  // TODO: Complete default due date
  cb();
};

/**
 * Plugins
 */

mongoose.model('InvoiceTerms', InvoiceTermsSchema);

InvoiceTermsSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );