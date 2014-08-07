'use strict';

/*exported should */
/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Subscription = mongoose.model('Subscription');

/**
 * Globals
 */
//var sub1;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Subscription:', function() {

    before(function(done) {

      done();
    });

    describe('Calculate Totals', function() {
      it('should correctly calculate extended prices and total correctly', function(done) {
        var subscription = {
          items: [
            {name: 'item1', price: 12.24, qty: 3},  // 36.72
            {name: 'item2', price: 16.49, qty: 5},  // 82.45
            {name: 'item3', price: 9.49, qty: 2},   // 18.98
            {name: 'item4', price: 13.75, qty: 10}, // 137.50
            {name: 'item5', price: 18.13, qty: 7}   // 126.91
          ]
        };

        Subscription.calculateTotals(subscription);

        subscription.items[0].should.have.property('extended', 36.72);
        subscription.items[1].should.have.property('extended', 82.45);
        subscription.items[2].should.have.property('extended', 18.98);
        subscription.items[3].should.have.property('extended', 137.50);
        subscription.items[4].should.have.property('extended', 126.91);
        //subscription.should.have.property('total', 402.56);

        done();

      });
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
