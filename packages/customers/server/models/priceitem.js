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
var PriceItemSchema = new Schema({
  defaultQty: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  item: {
    type: ObjectId,
    required: true,
    ref: 'Item'
  }
});

/**
 * Plugins
 */

module.exports.Schema = PriceItemSchema;
mongoose.model('PriceItem', PriceItemSchema);

PriceItemSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );
//InvoiceSchema.plugin(autoIncrement.plugin, { model: 'Invoice', field: 'invoiceNumber' });
