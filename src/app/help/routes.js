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
        '/help',
        {
          controller: 'HelpCtrl',
          templateUrl: 'app/help/template.html'
        }
      );

  }]);

});
