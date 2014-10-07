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
        '/',
        {
          controller: 'HomeCtrl',
          templateUrl: 'app/home/template.html'
        }
      );

  }]);

});
