'use strict';

angular.module('mean.customers').controller('CustomersController', ['$scope', ' $location', 'Global', 'Customers',
  function ($scope, $location, Global, Customers) {
    $scope.global = Global;
    $scope.package = {
      name: 'customers'
    };

    $scope.create = function (isValid) {
      if (isValid) {
        var customer = new Customers({
          displayName: this.displayName,
          description: this.description,
          contacts: [
            {
              title: this.title,
              firstName: this.firstName,
              lastName: this.lastName,
              middleName: this.middleName,
              email: this.email,
              phone: this.phone,
              mobile: this.mobile,
              fax: this.fax,
              website: this.website
            }
          ]
        });

        customer.$save(function (response) {
          $location.path('customers');
        });

        // this.name = '';
        // this.description = '';
      } else {
        $scope.submitted = true;
      }
    };
  }
]);
