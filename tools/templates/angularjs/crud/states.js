define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  //---

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
      .when('/<%= route %>', '/<%= route %>/list'); // default

    $stateProvider
      .state('<%= name %>', {
        abstract: true,
        url: '/<%= route %>',
        views: {
          'master': {
            templateUrl   : 'app/main/templates/layout.html'
          }
        }
      })
      .state('<%= name %>.list', {
        url: '/list',
        views: {
          'content@<%= name %>': {
            templateUrl   : '<%= location %>/templates/list.html',
            controller    : '<%= helpers.capitalize( name ) %>ListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('<%= name %>.search', {
        url: '/search',
        views: {
          'content@<%= name %>': {
            templateUrl   : '<%= location %>/templates/search.html',
            controller    : '<%= helpers.capitalize( name ) %>SearchCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('<%= name %>.new', {
        url: '/new',
        views: {
          'content@<%= name %>': {
            templateUrl   : '<%= location %>/templates/form.html',
            controller    : '<%= helpers.capitalize( name ) %>NewCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('<%= name %>.edit', {
        url: '/edit/:id',
        views: {
          'content@<%= name %>': {
            templateUrl   : '<%= location %>/templates/form.html',
            controller    : '<%= helpers.capitalize( name ) %>EditCtrl',
            controllerAs  : 'vm'
          }
        }
      });

  }

});
