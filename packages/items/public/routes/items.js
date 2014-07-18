'use strict';

angular.module('mean.items').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('view items', {
            url: '/items',
            templateUrl: 'items/views/list.html'
        });
    }
]);
