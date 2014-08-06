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
  revRecTemplate: {
    type: String,
    required: true
  },
  setupFee: {
    type: Number,
    default: 0
  },
  recurringPeriod: {
    type: Number,
    required: true
  },
  recurringPeriodType: {
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

ItemSchema.statics.query = function (query, cb) {
  var q = {};
  if(!!query.name) {
    q.name = new RegExp(query.name, 'i');
  }

  if(!!query.term){
    q.term = query.term;
  }
  return this.find(q, cb);
};

ItemSchema.statics.terms = function (cb) {
  cb(['Once','Monthly', 'Bi-Monthly','Quarterly','Yearly']);
};

ItemSchema.statics.revRecTemplates = function (cb) {
  cb(['Once','12 Month', 'Evenly Applied']);
};

/**
 * Plugins
 */

mongoose.model('Item', ItemSchema);

ItemSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );