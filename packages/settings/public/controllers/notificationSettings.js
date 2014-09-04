'use strict';

angular.module('mean.settings').controller('NotificationSettingsController', ['$scope', '$state', '$filter', 'Global', 'ngTableParams',
  function($scope, $state, $filter, Global, TableParams) {
    $scope.global = Global;
    $scope.package = {
      name: 'notification settings'
    };

    $scope.save = function(notificationSetting) {
    };
  }
]);
