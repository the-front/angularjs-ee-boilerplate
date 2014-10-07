define(function(require) {
  'use strict';

  var module = require('./module');

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

    // TODO: add here new item

    menu.addMenuItem('About', 'about');
    menu.addMenuItem('Help', 'help', 'right');
    //--- @end: menu items

  }]);

});
