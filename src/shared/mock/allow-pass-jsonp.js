define(function(require) {
  'use strict';

  var backend = require('shared/mock/backend');

  console.log('load jsonp allow pass mock');

  backend.addResource(AllowPass);

  //---

  AllowPass.$inject = ['$httpBackend', 'regexpUrl'];

  function AllowPass(httpBackend, regexpUrl) {

    // Allow JSONP to pass to external services (ie Solr)
    httpBackend.when('JSONP', regexpUrl(/http:\/\/.*/)).passThrough();

  }

});
