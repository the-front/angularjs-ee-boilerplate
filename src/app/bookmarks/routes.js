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
          templateUrl   : 'app/bookmarks/templates/list.html',
          controller    : 'BookmarksListCtrl',
          controllerAs  : 'vm'
        }
      )
      .when(
        '/bookmarks/search',
        {
          templateUrl   : 'app/bookmarks/templates/search.html',
          controller    : 'BookmarksSearchCtrl',
          controllerAs  : 'vm',
        }
      )
      .when(
        '/bookmarks/new',
        {
          templateUrl   : 'app/bookmarks/templates/form.html',
          controller    : 'BookmarksNewCtrl',
          controllerAs  : 'vm'
        }
      )
      .when(
        '/bookmarks/edit/:id',
        {
          templateUrl   : 'app/bookmarks/templates/form.html',
          controller    : 'BookmarksEditCtrl',
          controllerAs  : 'vm'
        }
      )
    ;

  }

});
