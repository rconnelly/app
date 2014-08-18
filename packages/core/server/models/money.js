'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Validations
 */

/**
 * User Schema
 */
var MoneySchema = new Schema({
  value: {
    type: Number,
    required: true
  },
  ccode: {
    type: String,
    required: true
  }
});

/** Statics */

/**
 * Middleware
 */

/**
 * Plugins
 */

mongoose.model('Money', MoneySchema);
