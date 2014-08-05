'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-times'),
  PriceItem = require('./priceitem').Schema,
  _ = require('lodash');

/**
 * Validations
 */

/**
 * User Schema
 */
var CustomerSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  checkName: {
    type: String
  },
  contact: {
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
    }
  },
  company: {
    name: {
      type: String
    },
    industry: {
      type: String
    },
    companySize: {
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
  priceItems: [PriceItem]
});

/** Custom validation */
CustomerSchema.pre('save', function (next) {

  var newList = _.unique(this.priceItems, false, function(priceItem){
    return priceItem.item;
  });

  if(newList.length !== this.priceItems.length) {
    var error = new mongoose.Error.ValidationError('An item with that name already exists');
    return next(error);
  }
  next();
});


/** Statics */

CustomerSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

/**
 * Plugins
 */

module.exports = mongoose.model('Customer', CustomerSchema);

CustomerSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );
//InvoiceSchema.plugin(autoIncrement.plugin, { model: 'Invoice', field: 'invoiceNumber' });
