define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configure);

  //---

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider) {

    $routeProvider
      .when(
        '/help',
        {
          controller: 'HelpCtrl',
          controllerAs: 'vm',
          templateUrl: 'app/help/template.html'
        }
      );

  }

});
