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
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  term: {
    type: String,
    required: true
  }
});

/** Statics */
ItemSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

ItemSchema.statics.query = function (name, cb) {
  this.find({ name: new RegExp(name, 'i') }, cb);
};

ItemSchema.statics.terms = function (cb) {
  cb(['Once','Monthly', 'Bi-Monthly','Quarterly','Yearly']);
};

/**
 * Plugins
 */

mongoose.model('Item', ItemSchema);

ItemSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );