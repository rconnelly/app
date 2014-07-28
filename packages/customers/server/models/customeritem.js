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
var CustomerItemSchema = new Schema({
  defaultQty: {
    type: Number
  },
  price: {
    type: Number
  },
  item: {
    type: ObjectId,
    required: true,
    ref: 'Item'
  }
});

/** Statics */

CustomerItemSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('item').exec(cb);
};

/**
 * Plugins
 */

mongoose.model('CustomerItem', CustomerItemSchema);

CustomerItemSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );
//InvoiceSchema.plugin(autoIncrement.plugin, { model: 'Invoice', field: 'invoiceNumber' });