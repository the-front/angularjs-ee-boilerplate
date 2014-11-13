define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configure);

  //---

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider) {

    $routeProvider
      .when(
        '/bookmarks',
        {
          controller: 'BookmarksListCtrl as vm',
          templateUrl: 'app/bookmarks/templates/list.html'
        }
      )
      .when(
        '/bookmarks/search',
        {
          controller: 'BookmarksSearchCtrl as vm',
          templateUrl: 'app/bookmarks/templates/search.html'
        }
      )
      .when(
        '/bookmarks/new',
        {
          controller: 'BookmarksNewCtrl as vm',
          templateUrl: 'app/bookmarks/templates/form.html'
        }
      )
      .when(
        '/bookmarks/edit/:id',
        {
          controller: 'BookmarksEditCtrl as vm',
          templateUrl: 'app/bookmarks/templates/form.html'
        }
      )
    ;

  }

});
