define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory(

    // resource name
    '<%= helpers.capitalize( name ) %>Resource',

    // dependency injection
    ['$resource',

  function($resource) {

    var rest = $resource(
      '<%= endpoint %>/:id',
      {
        'id': ''
      },
      {
        'update': { 'method': 'PUT' }
      }
    );

    return rest;

  }]);

});
