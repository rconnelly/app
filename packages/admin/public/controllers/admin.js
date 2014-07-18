'use strict';

angular.module('mean.admin')
  .controller('AdminController', ['$scope', 'Global', 'Admin',
    function($scope, Global, Admin) {
        $scope.global = Global;
        $scope.package = {
            name: 'admin'
        };
    }
  ]);
