define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('MenuConfig', MenuConfig);

  //---

  MenuConfig.$inject = ['$rootScope', '$location'];

  function MenuConfig($scope, $location) {

    var menuItemSelected = null,
        locationsMap = {},
        menuItems = {
          left: [],
          right: []
        };

    var service = {
      addMenuItem: addMenuItemFn
    };

    //--- @begin: $scope config
    $scope.menuItems = menuItems;

    $scope.location = $location;
    $scope.$watch("location.path()", checkLocationFn, true);
    //--- @end: $scope config

    return service;

    //---

    //--- @begin: internal functions
    function menuItemFn(label, location, css) {
      return {
        label: label,
        location: '/'+location,
        url: '#'+location,
        css: (css || '') // 'active'
      };
    }

    function addMenuItemFn(label, location, position) {
      position = position || 'left';
      var menuItem = menuItemFn(label, location);
      locationsMap[menuItem.location] = menuItem;

      switch(position){
        case 'left':
          menuItems.left.push(menuItem);
          break;
        case 'right':
          menuItems.right.push(menuItem);
          break;
      }
    }

    function selectMenuItemFn(item) {
      if(item !== menuItemSelected) {
        if(menuItemSelected !== null) menuItemSelected.css = '';
        item.css = 'active';
        menuItemSelected = item;
      }
    }

    function checkLocationFn() {
      var path, splitArr, location;

      path = $location.path();
      splitArr = path.split('/');
      if(splitArr.length > 2) {
        path = '/'+splitArr[1];
        splitArr = null;
      }

      location = locationsMap[path];
      if(location) {
        selectMenuItemFn(location);
      } else {
        if(menuItemSelected !== null) {
          menuItemSelected.css = '';
          menuItemSelected = null;
        }
      }
    }
    //--- @end: internal functions

  }


});
