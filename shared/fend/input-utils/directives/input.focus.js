define(
// require.js dependency injection
[
  '../module'
], 

// require.js module scope
function(module) {
  'use strict';

  
  module.directive(
    
    // component name
    'fendFocus', 

  // component definition
  function() {

    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        scope.$watch(attr.fendFocus, function (n, o) {
          if (n !== 0 && n) {
            element[0].focus();
          }
        });
      }
    };

  });

  /*
    based on:
    http://blog.ejci.net/2013/08/06/dealing-with-focus-and-blur-in-angularjs-directives/
  */


});