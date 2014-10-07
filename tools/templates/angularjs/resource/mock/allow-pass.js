define(function(require) {
  'use strict';

  var backend = require('shared/mock/backend');

  backend.addResource(
    // mock resource dependencies injection
    ['$httpBackend', 'regexpUrl',

  // mock resource definition
  function($httpBackend, regexpUrl) {

    //--- @begin: Allow pass to server

      // get all
    $httpBackend
      .when('GET', regexpUrl(/<%= helpers.stringRegExpEscape( endpoint ) %>(\?|$)/))
      .passThrough();

      // get one
    $httpBackend
      .when('GET', regexpUrl(/<%= helpers.stringRegExpEscape( endpoint ) %>(\/)?([A-z0-9]+)?$/))
      .passThrough();

      // create
    $httpBackend
      .when('POST', regexpUrl(/<%= helpers.stringRegExpEscape( endpoint ) %>$/))
      .passThrough();

      // update
    $httpBackend
      .when('PUT', regexpUrl(/<%= helpers.stringRegExpEscape( endpoint ) %>(\/)?([A-z0-9]+)?$/))
      .passThrough();

      // delete
    $httpBackend
      .when('DELETE', regexpUrl(/<%= helpers.stringRegExpEscape( endpoint ) %>(\/)?([A-z0-9]+)?$/))
      .passThrough();

    //--- @end: Allow pass to server
  }]);

});
