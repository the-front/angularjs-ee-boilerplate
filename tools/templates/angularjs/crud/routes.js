define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(

    // dependencies injection
    ['$routeProvider',

  // routes definition
  function ($routeProvider) {

    $routeProvider
      .when(
        '/<%= route %>',
        {
          controller: '<%= helpers.capitalize( name ) %>ListCtrl',
          templateUrl: '<%= location %>/templates/list.html'
        }
      )
      .when(
        '/<%= route %>/search',
        {
          controller: '<%= helpers.capitalize( name ) %>SearchCtrl',
          templateUrl: '<%= location %>/templates/search.html'
        }
      )
      .when(
        '/<%= route %>/new',
        {
          controller: '<%= helpers.capitalize( name ) %>NewCtrl',
          templateUrl: '<%= location %>/templates/form.html'
        }
      )
      .when(
        '/<%= route %>/edit/:id',
        {
          controller: '<%= helpers.capitalize( name ) %>EditCtrl',
          templateUrl: '<%= location %>/templates/form.html'
        }
      )
    ;

  }]);

});
