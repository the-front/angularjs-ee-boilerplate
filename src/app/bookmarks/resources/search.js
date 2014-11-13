define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('BookmarksSearchResource', BookmarksSearchResource);

  //---

  BookmarksSearchResource.$inject = ['$resource'];

  function BookmarksSearchResource($resource) {

    var rest = $resource(
      'rest/bookmarks/search/:name'
    );

    return rest;

  }

});
