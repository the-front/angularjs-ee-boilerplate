define(
// require.js dependency injection
[
  'shared/mock/backend'
],

// require.js module scope
function(backend) {
  'use strict';


  backend.addResource(
    // mock resource dependencies injection
    ['$httpBackend', 'regexpUrl',

  // mock resource definition
  function($httpBackend, regexpUrl) {

    // Allow GET users from GitHub API
    $httpBackend.when('GET', regexpUrl(/api\.github\.com\/users(\/)?([A-z0-9]+)?$/)).passThrough();

  }]);


});
