define(
// require.js dependency injection
[
  './module'
],

// require.js module scope
function(module) {
  'use strict';


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
