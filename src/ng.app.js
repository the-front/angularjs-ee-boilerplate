define(function(require) {
  'use strict';

  var angular = require('angular');

  angular.element(document).ready(startAngularApp);

  //---

  function startAngularApp() {

    console.log('bootstrap angular application');

    // define run module to bootstrap application
    var module = angular.module(
      // module name
      'run',

      // module dependencies
      [
        // enable mock and intercept $HTTP requests
        require('./require.mock.load').name,

        require('app/main/package').name
      ]
    );

    // https://github.com/angular/protractor/issues/66#issuecomment-186333950
    if(location.href.indexOf("protractor-test") < 0){
      // start angular app
      angular.bootstrap(document, [module.name]);
    } else {
      // start angular app to protractor tests
      window.name = 'NG_DEFER_BOOTSTRAP!' + window.name;
      angular.bootstrap(document, [module.name]);
    }

  }

});
