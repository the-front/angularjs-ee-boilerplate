angular.mock.backend.addResource(function($httpBackend, regexpUrl) {
  'use strict';

  // Allow GET users from GitHub API
  $httpBackend.when('GET', regexpUrl(/api\.github\.com\/users(\/)?([A-z0-9]+)?$/)).passThrough();

});