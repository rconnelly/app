'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-times'),
  ObjectId = mongoose.Schema.Types.ObjectId,
  _ = require('lodash');


require('mongoose-schema-extend');

/**
 * Validation
 */

/**
 * Base Subscription Type Schema
 */
var SubscriptionTypeSchema = new Schema({
  account: {
    type: ObjectId,
    ref: 'Account'
  },
  name: {
    type: String,
    required: true
  },
  _type: {
    type: String,
    required: true
  }
}, { discriminatorKey : '_type' });

/**
 *
 * Child Subscription Type Schemas
 */
var MonthlySubscriptionTypeSchema = SubscriptionTypeSchema.extend({
  monthlyInterval: {
    type: Number,
    required: true
  },
  dayOfMonth: {
    type: Number,
    required: true,
    min: 1, // 1 means first day of month
    max: 29 // 29 means last day of month
  }
});

var MonthlyByDayOfWeekSubscriptionTypeSchema = SubscriptionTypeSchema.extend({
  dayOfWeek: {
    type: Number,
    required: true
  },
  weekOfMonth: {
    type: Number,
    required: true
  },
  monthlyInterval: {
    type: Number,
    required: true
  }
});

var AnnualSubscriptionTypeSchema = SubscriptionTypeSchema.extend({
  month: {
    type: Number,
    required: true
  },
  dayOfMonth: {
    type: Number,
    required: true
  }
});

/**
 *  Statics
 */
/**
 * daysOfWeek
 * @param cb callback function returns a list of days of week
 */
SubscriptionTypeSchema.statics.daysOfWeek = function(cb) {
  var results = _.forEach([{ name:'Sunday', value: 0 },
    { name:'Monday', value: 1 },
    { name:'Tuesday', value: 2 },
    { name:'Wednesday', value: 3 },
    { name:'Thursday', value: 4 },
    { name:'Friday', value: 5 },
    { name:'Saturday', value: 6 } ]);
  cb(results);
};

/**
 *  Statics
 */
/**
 * daysOfMonth
 * @param cb callback function returns a list of days of week
 */
SubscriptionTypeSchema.statics.daysOfMonth = function(cb) {
  var results = _.forEach([{ name:'1', value: 1 },
    { name:'2', value: 2 },
    { name:'3', value: 3 },
    { name:'4', value: 4 },
    { name:'5', value: 5 },
    { name:'6', value: 6 },
    { name:'7', value: 7 },
    { name:'8', value: 8 },
    { name:'9', value: 9 },
    { name:'10', value: 10 },
    { name:'11', value: 11 },
    { name:'12', value: 12 },
    { name:'13', value: 13 },
    { name:'14', value: 14 },
    { name:'15', value: 15 },
    { name:'16', value: 16 },
    { name:'17', value: 17 },
    { name:'18', value: 18 },
    { name:'19', value: 19 },
    { name:'20', value: 20 },
    { name:'21', value: 21 },
    { name:'22', value: 22 },
    { name:'23', value: 23 },
    { name:'24', value: 24 },
    { name:'25', value: 25 },
    { name:'26', value: 26 },
    { name:'27', value: 27 },
    { name:'28', value: 28 },
    { name:'Last', value: 29 }]);
  cb(results);
};

/**
 *  Statics
 */
/**
 * months
 * @param cb callback function returns a list of months
 */
SubscriptionTypeSchema.statics.months = function(cb) {
  var results = _.forEach([{ name:'January', value: 1 },
    { name:'February', value: 2 },
    { name:'March', value: 3 },
    { name:'April', value: 4 },
    { name:'May', value: 5 },
    { name:'June', value: 6 },
    { name:'July', value: 7 },
    { name:'August', value: 8 },
    { name:'September', value: 9 },
    { name:'October', value: 10 },
    { name:'November', value: 11 },
    { name:'December', value: 12 }]);
  cb(results);
};

/**
 * A named list of schedule types
 * @param cb callback returns a list of types
 */
SubscriptionTypeSchema.statics.scheduleTypes = function(cb) {
  var results = [
    { name: 'Monthly', value: 'Monthly' },
    //{ name: 'Monthly By Day of Week', value: 'MonthlyByDayOfWeek' },
    { name: 'Annual', value: 'Annual' }
  ];
  cb(results);
};


SubscriptionTypeSchema.statics.load = function(id, cb) {
  return this.findOne({
    _id: id
  }).exec(cb);
};

/**
 * Middleware
 */


/**
 * Plugins
 */

SubscriptionTypeSchema.plugin(timestamps, {created: 'createdAt', lastUpdated: 'updatedAt'} );

/**
 * Registration
 */

mongoose.model('SubscriptionType', SubscriptionTypeSchema);
mongoose.model('Monthly', MonthlySubscriptionTypeSchema);
mongoose.model('MonthlyByDayOfWeek', MonthlyByDayOfWeekSubscriptionTypeSchema);
mongoose.model('Annual', AnnualSubscriptionTypeSchema);
