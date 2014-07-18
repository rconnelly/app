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
var AddressSchema = new Schema({
  name: {
    type: String
  },
  address1: {
    type: String
  },
  address2: {
    type: String
  },
  state: {
    type: String
  },
  postalCode: {
    type: String
  },
  country: {
    type: String
  }
});

/**
 * Plugins
 */

mongoose.model('Address', AddressSchema);

AddressSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );
//InvoiceSchema.plugin(autoIncrement.plugin, { model: 'Invoice', field: 'invoiceNumber' });