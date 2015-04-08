define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  //---

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('<%= name %>', {
        url: '/<%= route %>',
        views: {
          'master': {
            templateUrl   : 'app/main/templates/layout.html'
          },
          'content@<%= name %>': {
            templateUrl   : '<%= location %>/template.html',
            controller    : '<%= helpers.capitalize( name ) %>Ctrl',
            controllerAs  : 'vm'
          }
        }
      });

  }

});
