'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-times'),
  async = require('async'),
  ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Validations
 */

/**
 * User Schema
 */
var InvoiceTermsSchema = new Schema({
  account: {
    type: ObjectId,
    ref: 'Account'
  },
  name: {
    type: String,
    required: true
  },
  fixedDays: {
    type: Number
  }
});

/** Statics */
InvoiceTermsSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

InvoiceTermsSchema.statics.seedInvoiceTerms = function(terms,cb) {
  var This = this;
  This.findOne({ name: terms.name }).exec(function(err, result){
    if(!!result) {
      if(!!cb)
        cb();
    } else {
      // RJC - Hack because this method is called called before
      // mongoose time plugin
      terms.createdAt = Date.now();
      terms.updatedAt = Date.now();

      This.create(terms, function (err, result2) {
        console.log('Seeding: Adding invoice terms: ' + terms.name);
        if(!!cb)
          cb(err, result2);
      });
    }
  });
};

InvoiceTermsSchema.statics.seed = function(cb) {
  var terms = ['Net 15', 'Net 30', 'Net 45'];
  var This = this;
  async.each(terms, function(name, callback){
    This.seedInvoiceTerms({name: name}, callback);
  }, function(err) {
    if(err)
      console.log('Error occured: ' + err);
    if(!!cb) {
      cb(err);
    }
  });
};

InvoiceTermsSchema.statics.getDefaultDueDate = function(startDate, terms, cb) {
  // TODO: Complete default due date
  cb();
};

/**
 * Plugins
 */

InvoiceTermsSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );

/**
 * Register
 */
var model = mongoose.model('InvoiceTerms', InvoiceTermsSchema);
module.exports.Schema = InvoiceTermsSchema;

/**
 * Seed
 */
model.seed();

