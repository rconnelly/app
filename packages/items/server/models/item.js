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
var ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: Number
  },
  price: {
    type: Number
  }
});

/**
 * Plugins
 */

mongoose.model('Item', ItemSchema);

ItemSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );