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
          templateUrl: '<%= location %>/template.html',
          controller: '<%= helpers.capitalize( name ) %>Ctrl',
          controllerAs: 'vm'
        }
      );

  }

});
