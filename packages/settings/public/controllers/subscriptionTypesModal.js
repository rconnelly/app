'use strict';

angular.module('mean.settings').controller('SubscriptionTypesModalController', ['$rootScope', '$scope', '$state', '$stateParams', 'Global', 'SubscriptionTypes','SETTINGS_EVENTS',
  function( $rootScope, $scope, $state, $stateParams, Global, SubscriptionTypes, SETTINGS_EVENTS) {
    $scope.global = Global;
    $scope.package = {
      name: 'settings'
    };
    $scope.pageTitle = 'Create Subscription Type';
    $scope.subscriptionType = {monthlyInterval:1};
    $scope.scheduleTypeOptionName = 'Select One';
    $scope.dayOfWeekOptionName = 'Select One';
    $scope.startDateOpened = false;
    $scope.endDateOpened = false;

    $scope.initEdit = function(){
      this.getScheduleTypes(function(results){
        $scope.scheduleTypes = results;
      });

      this.getDaysOfMonth(function(results){
        $scope.daysOfMonth = results;
      });

      this.getMonths(function(results){
        $scope.months = results;
      });
    };

    $scope.getScheduleTypes = function(cb) {
      SubscriptionTypes.getScheduleTypes(cb);
    };

    $scope.getDaysOfMonth = function(cb) {
      SubscriptionTypes.getDaysOfMonth(cb);
    };

    $scope.getMonths = function(cb) {
      SubscriptionTypes.getMonths(cb);
    };

    $scope.save = function(subscriptionType){
      if (this.subscriptionTypeForm.$valid) {
        var type = new SubscriptionTypes(subscriptionType);
        if(angular.isDefined($stateParams.typeId)) {
          type._id = $stateParams.typeId;
          type.$update(function(result){
            //$scope.$emit(SETTINGS_EVENTS.editSubscriptionType, {subscriptionType:result});
            $scope.$close();
          });
        } else {
          type.$save(function(result){
            $rootScope.$broadcast(SETTINGS_EVENTS.createSubscriptionType, {subscriptionType:result});
            $scope.$close();
          });
        }
      } else {
        $scope.submitted = true;
      }
    };

    $scope.openStartDate = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.startDateOpened = true;
      $scope.endDateOpened = false;
    };

    $scope.openEndDate = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.startDateOpened = false;
      $scope.endDateOpened = true;
    };

    $scope.cancel = function(){
      $scope.$dismiss();
    };
  }
]);
