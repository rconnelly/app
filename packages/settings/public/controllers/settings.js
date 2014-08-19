'use strict';

angular.module('mean.settings').controller('SettingsController', ['$scope', '$state', 'Global', 'Settings',
  function($scope, $state, Global, Settings) {
    $scope.global = Global;
    $scope.package = {
      name: 'settings'
    };

    $scope.isActive = function(link){
      return true;
    };
  }
]);
