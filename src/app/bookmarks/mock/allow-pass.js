define(function(require) {
  'use strict';

  var backend = require('shared/mock/backend');

  backend.addResource(AllowPass);

  //---

  AllowPass.$inject = ['$httpBackend', 'regexpUrl'];

  function AllowPass($httpBackend, regexpUrl) {

    //--- @begin: Allow pass to server

      // get all
    $httpBackend
      .when('GET', regexpUrl(/rest\/bookmarks(\?|$)/))
      .passThrough();

      // get one
    $httpBackend
      .when('GET', regexpUrl(/rest\/bookmarks(\/)?([A-z0-9]+)?$/))
      .passThrough();

      // create
    $httpBackend
      .when('POST', regexpUrl(/rest\/bookmarks$/))
      .passThrough();

      // update
    $httpBackend
      .when('PUT', regexpUrl(/rest\/bookmarks(\/)?([A-z0-9]+)?$/))
      .passThrough();

      // delete
    $httpBackend
      .when('DELETE', regexpUrl(/rest\/bookmarks(\/)?([A-z0-9]+)?$/))
      .passThrough();

      // search
    $httpBackend
      .when('GET', regexpUrl(/rest\/bookmarks\/search\/([A-z0-9]+)(\?|$)/))
      .passThrough();

    //--- @end: Allow pass to server

  }


});
