'use strict';


/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  SubscriptionType = mongoose.model('SubscriptionType'),
  MonthlySubscriptionType = mongoose.model('Monthly'),
  MonthlyByDayOfWeek = mongoose.model('MonthlyByDayOfWeek');

/**
 * Globals
 */
var monthlySubscriptionType;
var savedMonthlySubscriptionType;


var monthlySubscriptionType2;
var savedMonthlySubscriptionType2;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model SubscriptionType:', function() {
    describe('Static method months', function() {
      it('should return valid months', function(done) {
        SubscriptionType.months(function(results){
          results.should.have.length(12);
          results[0].should.have.property('value', 1);
          results[0].should.have.property('name', 'January');

          results[1].should.have.property('value', 2);
          results[1].should.have.property('name', 'February');

          results[2].should.have.property('value', 3);
          results[2].should.have.property('name', 'March');

          results[3].should.have.property('value', 4);
          results[3].should.have.property('name', 'April');

          results[4].should.have.property('value', 5);
          results[4].should.have.property('name', 'May');

          results[5].should.have.property('value', 6);
          results[5].should.have.property('name', 'June');

          results[6].should.have.property('value', 7);
          results[6].should.have.property('name', 'July');

          results[7].should.have.property('value', 8);
          results[7].should.have.property('name', 'August');

          results[8].should.have.property('value', 9);
          results[8].should.have.property('name', 'September');

          results[9].should.have.property('value', 10);
          results[9].should.have.property('name', 'October');

          results[10].should.have.property('value', 11);
          results[10].should.have.property('name', 'November');

          results[11].should.have.property('value', 12);
          results[11].should.have.property('name', 'December');

          done();
        });
      });
    });

    describe('Static method scheduleTypes', function() {
      it('should return valid schedule types', function(done) {
        SubscriptionType.scheduleTypes(function(results){
          results.should.have.length(2);
          results[0].should.have.property('value', 'Monthly');
          results[0].should.have.property('name', 'Monthly');
          results[1].should.have.property('value', 'Annual');
          results[1].should.have.property('name', 'Annual');
          done();
        });
      });
    });

    describe('Static method daysOfWeek', function() {
      it('should return valid days of month', function(done) {
        SubscriptionType.daysOfMonth(function(results){
          results.should.have.length(29);
          results[0].should.have.property('value', 1);
          results[28].should.have.property('value', 29);
          done();
        });
      });
    });

    describe('Static method daysOfWeek', function() {
      it('should return valid days of week', function(done) {
        SubscriptionType.daysOfWeek(function(results){
          results.should.have.length(7);
          results[0].should.have.property('value', 0);
          results[6].should.have.property('value', 6);
          done();
        });
      });
    });
  });

  describe('Model Monthly:', function() {

    before(function(done) {
      monthlySubscriptionType = {
        name: 'Monthly Subscription Type Test',
        monthlyInterval: 1
      };

      monthlySubscriptionType2 = {
        name: 'Monthly By Day of Week Subscription Type Test',
        dayOfWeek: 0,
        monthlyInterval: 5,
        weekOfMonth: 0
      };

      done();
    });

    describe('Validation', function() {
      it('should require monthlyInterval, weekOfMonth, and dayOfWeek', function(done) {
        should(MonthlyByDayOfWeek.schema.paths.monthlyInterval).have.property('isRequired',true);
        should(MonthlyByDayOfWeek.schema.paths.weekOfMonth).have.property('isRequired',true);
        should(MonthlyByDayOfWeek.schema.paths.dayOfWeek).have.property('isRequired',true);
        done();
      });
    });

    describe('Method Save', function() {
      it('should begin without the test monthly subscription type', function(done) {
        MonthlySubscriptionType.find({
          name: monthlySubscriptionType.name
        }, function(err, types) {
          should.not.exist(err);
          types.should.have.length(0);
          done();
        });
      });
      it('should be able to save without problems', function(done) {
        savedMonthlySubscriptionType2 = new MonthlyByDayOfWeek(monthlySubscriptionType2);
        savedMonthlySubscriptionType2.save(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });

    after(function(done) {
      savedMonthlySubscriptionType2.remove();

      done();
    });
  });

  describe('Model Monthly:', function() {
    before(function(done) {
      monthlySubscriptionType = {
        name: 'Monthly Test',
        monthlyInterval: 1,
        dayOfMonth: 1
      };

      done();
    });

    describe('Validation', function() {
      it('should require monthlyInterval and dayOfMonth', function(done) {
        should(MonthlySubscriptionType.schema.paths.monthlyInterval).have.property('isRequired',true);
        should(MonthlySubscriptionType.schema.paths.dayOfMonth).have.property('isRequired',true);
        done();
      });
    });

    describe('Method Save', function() {
      it('should begin without the test monthly subscription type', function(done) {
        MonthlySubscriptionType.find({
          name: monthlySubscriptionType.name
        }, function(err, types) {
          should.not.exist(err);
          types.should.have.length(0);
          done();
        });
      });

      it('should be able to save without problems', function(done) {
        savedMonthlySubscriptionType = new MonthlySubscriptionType(monthlySubscriptionType);
        savedMonthlySubscriptionType.save(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });

    after(function(done) {
      savedMonthlySubscriptionType.remove();

      done();
    });
  });

});
