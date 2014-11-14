define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configure);

  //---

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider) {

    $routeProvider
      .when(
        '/',
        {
          templateUrl: 'app/home/template.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        }
      );

  }

});
