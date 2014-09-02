define(
// require.js dependency injection
[
  '../module'
],

// require.js module scope
function(module) {
  'use strict';


  module.factory(

    // factory name
    'MenuConfig',

  // dependencies injection
  ['$rootScope', '$location',

  // factory definition
  function($scope, $location) {

    var menuItemFn,
        addMenuItemFn,
        selectMenuItemFn,
        checkLocationFn,
        menuItemSelected = null,
        locationsMap = {},
        menuItems = {
          left: [],
          right: []
        };

    //--- @begin: internal functions
    menuItemFn = function(label, location, css) {
      return {
        label: label,
        location: '/'+location,
        url: '#'+location,
        css: (css || '') // 'active'
      };
    };

    addMenuItemFn = function(label, location, position) {
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

    };

    selectMenuItemFn = function(item) {
      if(item !== menuItemSelected) {
        if(menuItemSelected !== null) menuItemSelected.css = '';
        item.css = 'active';
        menuItemSelected = item;
      }
    };

    checkLocationFn = function() {
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
    };
    //--- @end: internal functions

    //--- @begin: $scope config
    $scope.menuItems = menuItems;

    $scope.location = $location;
    $scope.$watch("location.path()", checkLocationFn, true);
    //--- @end: $scope config


    //--- @begin: public functions
    return {
      addMenuItem: addMenuItemFn
    };
    //--- @end: public functions

  }]);


});
