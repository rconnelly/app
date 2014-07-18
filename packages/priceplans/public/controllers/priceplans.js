'use strict';

angular.module('mean.priceplans').controller('PricePlansController', ['$scope', '$stateParams', '$location', 'Global', 'PricePlans',
  function($scope, $stateParams, $location, Global, PricePlans) {
    $scope.global = Global;

    $scope.package = {
      name: 'priceplans'
    };

    $scope.create = function (isValid) {
      if (isValid) {
        var priceplans = new PricePlans({
          name: this.name,
          description: this.description
        });

        priceplans.$save(function (response) {
          $location.path('priceplans');
        });

       // this.name = '';
       // this.description = '';
      } else {
        $scope.submitted = true;
      }
    };
  }
]);
