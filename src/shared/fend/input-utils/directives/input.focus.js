define(function(require) {
  'use strict';

  var module = require('../module');

  /*
    based on:
    http://blog.ejci.net/2013/08/06/dealing-with-focus-and-blur-in-angularjs-directives/
  */

  module.directive('fendFocus', fendFocus);

  //---

  function fendFocus() {

    var directive = {
      restrict: 'A',
      link: linkFunc
    };

    return directive;

    //---

    function linkFunc(scope, element, attr, ctrl) {

      scope.$watch(attr.fendFocus, function (n, o) {
        if (n !== 0 && n) {
          element[0].focus();
        }
      });

    }

  }

});
