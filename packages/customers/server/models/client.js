'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-times'),
  Company = require('./company'),
  Contact = require('./contact');

/**
 * Validations
 */

/**
 * User Schema
 */
var ClientSchema = new Schema({
  displayName: {
    type: String
  },
  checkName: {
    type: String
  },
  accountNumber: {
    type: String
  },
  taxId: {
    type: String
  },
  companies: [Company],
  contacts: [Contact]
});

/**
 * Plugins
 */

mongoose.model('Client', ClientSchema);

ClientSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );
//InvoiceSchema.plugin(autoIncrement.plugin, { model: 'Invoice', field: 'invoiceNumber' });