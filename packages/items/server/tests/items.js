'use strict';

/*exported should */
/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Item = mongoose.model('Item');

/**
 * Globals
 */
//var sub1;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Item:', function() {

    before(function(done) {

      done();
    });

    describe('Calculate Totals', function() {
      it('should correctly calculate extended prices and total correctly', function(done) {
        var object = {
          items: [
            {name: 'item1', price: 12.24, qty: 3},  // 36.72
            {name: 'item2', price: 16.49, qty: 5},  // 82.45
            {name: 'item3', price: 9.49, qty: 2},   // 18.98
            {name: 'item4', price: 13.75, qty: 10}, // 137.50
            {name: 'item5', price: 18.13, qty: 7}   // 126.91
          ]
        };

        Item.calculateTotals(object);

        object.items[0].should.have.property('extended', 36.72);
        object.items[1].should.have.property('extended', 82.45);
        object.items[2].should.have.property('extended', 18.98);
        object.items[3].should.have.property('extended', 137.50);
        object.items[4].should.have.property('extended', 126.91);

        done();

      });
    });

  });

  after(function(done) {

    done();
  });
});
