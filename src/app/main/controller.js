define(
// require.js dependency injection
[
  './module'
],

// require.js module scope
function(module) {
  'use strict';


  module.controller(

    // controller name
    'MainCtrl',

    // dependencies injection
    ['ProgressConfig', 'MenuConfig', '$scope',

  // controller definition
  function(progressConfig, menu, $scope) {

    $scope.appLoaded = 'ok';

    //--- @begin: loading progressbar config
    progressConfig.eventListeners();
    progressConfig.color('#428bca');
    progressConfig.height('3px');
    //--- @end: loading progressbar config

    //--- @begin: menu items
    menu.addMenuItem('Home', '');
    menu.addMenuItem('Bookmarks', 'bookmarks');
    menu.addMenuItem('About', 'about');
    menu.addMenuItem('Help', 'help', 'right');
    //--- @end: menu items

  }]);


});
