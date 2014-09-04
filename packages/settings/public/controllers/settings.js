'use strict';

angular.module('mean.settings').controller('SettingsController', ['$scope', '$state', 'Global',
  function($scope, $state, Global) {
    $scope.global = Global;
    $scope.package = {
      name: 'settings'
    };

    $scope.isActive = function(link){
      return true;
    };
  }
]);
