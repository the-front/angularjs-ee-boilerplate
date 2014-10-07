define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(

    // dependencies injection
    ['$routeProvider',

  // routes definition
  function ($routeProvider) {

    $routeProvider
      .when(
        '/about',
        {
          controller: 'AboutCtrl',
          templateUrl: 'app/about/templates/page.html'
        }
      );

  }]);

});
