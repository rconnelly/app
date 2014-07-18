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
 * User Schema
 */
var PricePlanSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

/**
 * Plugins
 */

mongoose.model('PricePlan', PricePlanSchema);

PricePlanSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );
//InvoiceSchema.plugin(autoIncrement.plugin, { model: 'Invoice', field: 'invoiceNumber' });