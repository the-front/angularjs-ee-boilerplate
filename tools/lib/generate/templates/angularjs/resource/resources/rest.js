define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('<%= helpers.capitalize( name ) %>Resource', <%= helpers.capitalize( name ) %>Resource);

  //---

  <%= helpers.capitalize( name ) %>Resource.$inject = ['$resource'];

  function <%= helpers.capitalize( name ) %>Resource($resource) {

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

  }


});
