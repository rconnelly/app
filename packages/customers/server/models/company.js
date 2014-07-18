'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-times'),
  Address = require('./address');

/**
 * Validations
 */

/**
 * User Schema
 */
var CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  industry: {
    type: String
  },
  companySize: {
    type: String
  },
  addresses: [Address]
});

/**
 * Plugins
 */

mongoose.model('Company', CompanySchema);

CompanySchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );
//InvoiceSchema.plugin(autoIncrement.plugin, { model: 'Invoice', field: 'invoiceNumber' });