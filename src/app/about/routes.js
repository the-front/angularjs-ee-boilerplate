define(function(require) {
  'use strict';

  var module = require('./module');

  module.config(configure);

  //---

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider) {

    $routeProvider
      .when(
        '/about',
        {
          controller: 'AboutCtrl',
          controllerAs: 'vm',
          templateUrl: 'app/about/templates/page.html'
        }
      );

  }

});
