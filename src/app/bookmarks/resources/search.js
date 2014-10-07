define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory(

    // resource name
    'BookmarksSearchResource',

    // dependency injection
    ['$resource',

  function($resource) {

    // http://code.angularjs.org/1.2.1/docs/api/ngResource.$resource
    var rest = $resource(
      'rest/bookmarks/search/:name'
    );

    return rest;

  }]);

});
