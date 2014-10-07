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
        '/bookmarks',
        {
          controller: 'BookmarksListCtrl',
          templateUrl: 'app/bookmarks/templates/list.html'
        }
      )
      .when(
        '/bookmarks/search',
        {
          controller: 'BookmarksSearchCtrl',
          templateUrl: 'app/bookmarks/templates/search.html'
        }
      )
      .when(
        '/bookmarks/new',
        {
          controller: 'BookmarksNewCtrl',
          templateUrl: 'app/bookmarks/templates/form.html'
        }
      )
      .when(
        '/bookmarks/edit/:id',
        {
          controller: 'BookmarksEditCtrl',
          templateUrl: 'app/bookmarks/templates/form.html'
        }
      )
    ;

  }]);

});
