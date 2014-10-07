define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory(

    // resource name
    '<%= helpers.capitalize( name ) %>SearchResource',

    // dependency injection
    ['$resource',

  function($resource) {

    var rest = $resource(
      '<%= endpoint %>/search/:name'
    );

    return rest;

  }]);

});
