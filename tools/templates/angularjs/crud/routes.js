define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configure);

  //---

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider) {

    $routeProvider
      .when(
        '/<%= route %>',
        {
          templateUrl   : '<%= location %>/templates/list.html',
          controller    : '<%= helpers.capitalize( name ) %>ListCtrl',
          controllerAs  : 'vm'
        }
      )
      .when(
        '/<%= route %>/search',
        {
          templateUrl   : '<%= location %>/templates/search.html',
          controller    : '<%= helpers.capitalize( name ) %>SearchCtrl',
          controllerAs  : 'vm'
        }
      )
      .when(
        '/<%= route %>/new',
        {
          templateUrl   : '<%= location %>/templates/form.html',
          controller    : '<%= helpers.capitalize( name ) %>NewCtrl',
          controllerAs  : 'vm'
        }
      )
      .when(
        '/<%= route %>/edit/:id',
        {
          templateUrl   : '<%= location %>/templates/form.html',
          controller    : '<%= helpers.capitalize( name ) %>EditCtrl',
          controllerAs  : 'vm'
        }
      );

  }

});
