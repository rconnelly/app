'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', '$state', 'Global', 'Menus',
  function($scope, $rootScope, $state, Global, Menus) {
    $scope.global = Global;
    $scope.menus = {};

    // Default hard coded menu items for main menu
    var defaultMainMenu = [];
    var topMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu(name, defaultMenu) {

      Menus.query({
        name: name,
        defaultMenu: defaultMenu
      }, function(menu) {
        $scope.menus[name] = menu;
      });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);
    queryMenu('top', topMenu);

    $scope.isBannerCollapsed = true;
    $scope.isMainMenuCollapsed = true;

    $scope.isActive = function(item) {
      if(!item.section)
        return false;
      return $state.includes(item.section);
    };

    $rootScope.$on('loggedin', function() {

      queryMenu('main', defaultMainMenu);
      queryMenu('top', topMenu);

      $scope.global = {
        authenticated: !! $rootScope.user,
        user: $rootScope.user
      };
    });

  }
]);
