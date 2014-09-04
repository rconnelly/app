'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Invoice = mongoose.model('Invoice');

/**
 * Globals
 */
var invoice1;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Invoice:', function() {

    before(function(done) {
      invoice1 = {

      };

      done();
    });

    describe('Method Save', function() {
      it('should have proper validation', function(done) {
        done();
      });

      it('should begin without the invoice', function(done) {
        Invoice.find(invoice1._id, function(err, invoices) {
          invoices.should.have.length(0);
          done();
        });
      });

      it('should be able to save without problems', function(done) {

        /*var _invoice = new User(invoice);
         _invoice.save(function(err) {
         should.not.exist(err);
         _user.remove();
         done();
         }); */

        done();
      });

      it('should be able to create and edit invoice', function(done) {
        done();
      });

      it('should fail to save an existing user with the same values', function(done) {
        done();
      });

      it('should show an error when try to save without name', function(done) {
        done();
        /*
         var _user = new User(user1);
         _user.name = '';

         return _user.save(function(err) {
         should.exist(err);
         done();
         });
         */
      });

      it('should show an error when try to save without a customer', function(done) {
        should.exist(done);
        done();
        /*
         var _user = new User(user1);
         _user.username = '';

         return _user.save(function(err) {
         should.exist(err);
         done();
         });
         (*/
      });
    });

    after(function(done) {

      /** Clean up user objects
       * un-necessary as they are cleaned up in each test but kept here
       * for educational purposes
       *
       *  var _user1 = new User(user1);
       *  var _user2 = new User(user2);
       *
       *  _user1.remove();
       *  _user2.remove();
       */

      done();
    });
  });
});
