define(
// require.js dependency injection
[
  '../module',
  '../resources/rest'
], 

// require.js module scope
function(module) {
  'use strict';


  module.controller(

    // controller name
    'BookmarksNewCtrl',

    // dependencies injection
    ['$rootScope', '$scope', 'BookmarksResource', 'InputFocusFactory',

  // controller definition
  function ($rootScope, $scope, resource, input) {

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

    $scope.bookmark = new resource({
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