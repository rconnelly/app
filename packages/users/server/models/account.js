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
  },
  company: {
    name: {
      type: String
    }
  },
  billingAddress: {
    address1: {
      type: String
    },
    address2: {
      type: String
    },
    city: {
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
  },
  shippingAddress: {
    sameAsBilling: {
      type: Boolean
    },
    address1: {
      type: String
    },
    address2: {
      type: String
    },
    city: {
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
  }
});

mongoose.model('Account', AccountSchema);

AccountSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );