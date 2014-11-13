define(function(require) {
  'use strict';

  var backend = require('shared/mock/backend');

  backend.addResource(resource);

  //---

  // mock resource dependencies injection
  resource.$inject = ['$httpBackend', 'regexpUrl'];

  // mock resource definition
  function resource($httpBackend, regexpUrl) {

    // Allow GET users from GitHub API
    $httpBackend.when('GET', regexpUrl(/api\.github\.com\/users(\/)?([A-z0-9]+)?$/)).passThrough();

  }

});
