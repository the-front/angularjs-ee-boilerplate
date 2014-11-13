define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('BookmarksResource', BookmarksResource);

  //---

  BookmarksResource.$inject = ['$resource'];

  function BookmarksResource($resource) {

    var rest = $resource(
      'rest/bookmarks/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );

    return rest;

  }

});
