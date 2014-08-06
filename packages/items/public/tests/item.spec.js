'use strict';

(function() {
  // Login Controller Spec
  describe('MEAN controllers', function() {
    describe('ItemsController', function() {
      beforeEach(function() {
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });
    });
  });


}());
