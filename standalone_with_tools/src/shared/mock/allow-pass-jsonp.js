define(
// require.js dependency injection
[
  'shared/mock/backend'
],

// require.js module scope
function(backend) {
  'use strict';

  console.log('load jsonp allow pass mock');

  backend.addResource(

    // mock resource dependencies injection
    ['$httpBackend', 'regexpUrl',

  // mock resource definition
  function(httpBackend, regexpUrl) {

    // Allow JSONP to pass to external services (ie Solr)
    httpBackend.when('JSONP', regexpUrl(/http:\/\/.*/)).passThrough();

  }]);


});
