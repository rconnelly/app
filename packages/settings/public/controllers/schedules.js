'use strict';

angular.module('mean.settings').controller('SchedulesController', ['$scope', '$state', 'Global', 'Settings',
  function($scope, $state, Global, Settings) {
    $scope.global = Global;
    $scope.package = {
      name: 'settings'
    };
    $scope.pageTitle = 'Create Schedule';

    $scope.save = function(schedule){
      $scope.$close();
    };

    $scope.cancel = function(){
      $scope.$dismiss();
    };
  }
]);
