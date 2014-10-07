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
          controller: '<%= helpers.capitalize( name ) %>Ctrl',
          templateUrl: '<%= location %>/template.html'
        }
      );

  }]);

});
