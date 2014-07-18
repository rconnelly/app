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
var ContactSchema = new Schema({
  title: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  middleName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  phone: {
    type: String
  },
  mobile: {
    type: String
  },
  fax: {
    type: String
  },
  website: {
    type: String
  },
  addresses: [Address]
});

/**
 * Plugins
 */

mongoose.model('Contact', ContactSchema);

ContactSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );
//InvoiceSchema.plugin(autoIncrement.plugin, { model: 'Invoice', field: 'invoiceNumber' });