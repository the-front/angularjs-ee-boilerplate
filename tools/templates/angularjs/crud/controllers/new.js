define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller(

    // controller name
    '<%= helpers.capitalize( name ) %>NewCtrl',

    // dependencies injection
    ['$rootScope', '$scope', '<%= helpers.capitalize( name ) %>Resource', 'InputFocusFactory',

  // controller definition
  function ($rootScope, $scope, Resource, input) {

    //---
    var ctrlName = '<%= helpers.capitalize( name ) %>NewCtrl';
    input = input.get(ctrlName);

    input.config(
      $scope,
      [
        'focus<%= helpers.capitalize( name ) %>NameInput'
      ]);

    input.setFocus('focus<%= helpers.capitalize( name ) %>NameInput', 200);

    //console.debug(input);
    //---

    $scope.title = 'New <%= helpers.capitalize( name ) %>';

    $scope.<%= name %> = new Resource({
      'id':0,
      'name':'',
      'description':''
    });

    $scope.save = function() {
      $scope.<%= name %>.$save(function(res) {
        $rootScope.$emit('<%= name %>:add:event', 'added');
      });
    };

  }]);

});
