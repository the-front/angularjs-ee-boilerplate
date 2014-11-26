define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configureStates);

  //---

  configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configureStates($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
      .when('/bookmarks', '/bookmarks/list'); // default

    $stateProvider
      .state('bookmarks', {
        abstract: true,
        url: '/bookmarks',
        views: {
          'master': {
            templateUrl   : 'app/main/templates/layout.html'
          }
        }
      })
      .state('bookmarks.list', {
        url: '/list',
        views: {
          'content@bookmarks': {
            templateUrl   : 'app/bookmarks/templates/list.html',
            controller    : 'BookmarksListCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('bookmarks.search', {
        url: '/search',
        views: {
          'content@bookmarks': {
            templateUrl   : 'app/bookmarks/templates/search.html',
            controller    : 'BookmarksSearchCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('bookmarks.new', {
        url: '/new',
        views: {
          'content@bookmarks': {
            templateUrl   : 'app/bookmarks/templates/form.html',
            controller    : 'BookmarksNewCtrl',
            controllerAs  : 'vm'
          }
        }
      })
      .state('bookmarks.edit', {
        url: '/edit/:id',
        views: {
          'content@bookmarks': {
            templateUrl   : 'app/bookmarks/templates/form.html',
            controller    : 'BookmarksEditCtrl',
            controllerAs  : 'vm'
          }
        }
      });

  }

});
