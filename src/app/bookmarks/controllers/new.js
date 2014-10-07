define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller(

    // controller name
    'BookmarksNewCtrl',

    // dependencies injection
    ['$rootScope', '$scope', 'BookmarksResource', 'InputFocusFactory',

  // controller definition
  function ($rootScope, $scope, Resource, input) {

    //---
    var ctrlName = 'BookmarksNewCtrl';
    input = input.get(ctrlName);

    input.config(
      $scope,
      [
        'focusBookmarkNameInput'
      ]);

    input.setFocus('focusBookmarkNameInput', 200);

    //console.debug(input);
    //---

    $scope.title = 'New Bookmark';

    $scope.bookmark = new Resource({
      'id':0,
      'name':'',
      'description':'',
      'url':''
    });

    $scope.save = function() {
      $scope.bookmark.$save(function(res) {
        $rootScope.$emit('bookmarks:add:event', 'added');
      });
    };

  }]);

});
