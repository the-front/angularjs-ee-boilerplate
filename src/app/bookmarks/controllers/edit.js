define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller(

    // controller name
    'BookmarksEditCtrl',

    // dependencies injection
    ['$rootScope', '$scope', 'BookmarksResource', '$routeParams', 'InputFocusFactory',

  // controller definition
  function ($rootScope, $scope, resource, $routeParams, input) {

    //---
    var ctrlName = 'BookmarksEditCtrl';
    input = input.get(ctrlName);

    input.config(
      $scope,
      [
        'focusBookmarkNameInput'
      ]);

    //console.debug(input);
    //---

    $scope.title = 'Edit Bookmark : ' + $routeParams.id;

    resource.get({id: $routeParams.id}, function(result) {
      $scope.bookmark = result;
      input.setFocus('focusBookmarkNameInput', 200);
    });

    $scope.save = function() {
      $scope.bookmark.$update({id: $routeParams.id}, function(res) {
        $rootScope.$emit('bookmarks:update:event', 'updated');
      });
    };

    $scope.showConfirm = false;

    $scope.remove = function() {
      $scope.showConfirm = true;
    };

    $scope.cancelRemove = function() {
      $scope.showConfirm = false;
      input.focusReset();
      input.setFocus('focusBookmarkNameInput');
    };

    $scope.destroy = function() {
      $scope.bookmark.$delete({id: $routeParams.id}, function(res) {
        $scope.showConfirm = false;
        $rootScope.$emit('bookmarks:remove:event', 'removed');
      });
    };

  }]);

});
