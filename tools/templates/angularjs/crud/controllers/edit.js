define(function(require) {
  'use strict';

  var module = require('../module');
  require('../resources/rest');

  module.controller(

    // controller name
    '<%= helpers.capitalize( name ) %>EditCtrl',

    // dependencies injection
    ['$rootScope', '$scope', '<%= helpers.capitalize( name ) %>Resource', '$routeParams', 'InputFocusFactory',

  // controller definition
  function ($rootScope, $scope, resource, $routeParams, input) {

    //---
    var ctrlName = '<%= helpers.capitalize( name ) %>EditCtrl';
    input = input.get(ctrlName);

    input.config(
      $scope,
      [
        'focus<%= helpers.capitalize( name ) %>NameInput'
      ]);

    //console.debug(input);
    //---

    $scope.title = 'Edit <%= helpers.capitalize( name ) %> : ' + $routeParams.id;

    resource.get({id: $routeParams.id}, function(result) {
      $scope.<%= name %> = result;
      input.setFocus('focus<%= helpers.capitalize( name ) %>NameInput', 200);
    });

    $scope.save = function() {
      $scope.<%= name %>.$update({id: $routeParams.id}, function(res) {
        $rootScope.$emit('<%= name %>:update:event', 'updated');
      });
    };

    $scope.showConfirm = false;

    $scope.remove = function() {
      $scope.showConfirm = true;
    };

    $scope.cancelRemove = function() {
      $scope.showConfirm = false;
      input.focusReset();
      input.setFocus('focus<%= helpers.capitalize( name ) %>NameInput');
    };

    $scope.destroy = function() {
      $scope.<%= name %>.$delete({id: $routeParams.id}, function(res) {
        $scope.showConfirm = false;
        $rootScope.$emit('<%= name %>:remove:event', 'removed');
      });
    };

  }]);

});
