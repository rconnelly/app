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
 *  Schema
 */
var AccountSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

mongoose.model('Account', AccountSchema);

AccountSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );