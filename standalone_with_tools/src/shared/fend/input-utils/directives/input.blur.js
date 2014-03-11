define(
// require.js dependency injection
[
  './module'
], 

// require.js module scope
function(module) {
  'use strict';


  module.directive(
    
    // component name
    'fendBlur', 

  // component definition
  function(){

    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        element.bind('blur', function () {
          //apply scope (attributes)
          scope.$apply(attr.fendBlur);
          //return scope value for focusing to false
          scope.$eval(attr.fendFocus + '=false');
        });
      }
    };

  });

  /*
    based on:
    http://blog.ejci.net/2013/08/06/dealing-with-focus-and-blur-in-angularjs-directives/
  */


});