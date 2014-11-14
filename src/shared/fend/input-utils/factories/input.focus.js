define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('InputFocusFactory', InputFocusFactory);

  //---

  InputFocusFactory.$inject = ['$timeout'];

  function InputFocusFactory($timeout) {

    var InputFocus = (function() {

      // private
      var $scope,
          focusFieldNameArray,
          lastFocusInput = null,
          toSelect = null;

      function isStr(s){
        return typeof s === "string" || s instanceof String;
      }

      function resetAll() {
        lastFocusInput = null;
        toSelect = null;
        resetFocusFields();
      }

      function resetFocusFields() {
        for(var i=0, len=focusFieldNameArray.length; i<len; i++) {
          $scope[focusFieldNameArray[i]] = false;
        }
      }

      function selectFocusField() {
        resetFocusFields();

        $scope[toSelect] = true;
        lastFocusInput = toSelect;
      }

      //--- === ---

      // class constructr
      var InputFocus = function(paginationFor) {
        this.classInfo = 'InputFocus for: ' + paginationFor;
      };
      var ClassDef = InputFocus;
      //---

      // public

      ClassDef.prototype.config = function(scope, _focusFieldNameArray) {
        $scope = scope;
        focusFieldNameArray = _focusFieldNameArray;
        resetAll();
      };

      ClassDef.prototype.setFocus = function(focusFieldName, wait) {
        if( isStr( focusFieldName ) ) {
          wait = wait || 100; // ms
          if(lastFocusInput !== focusFieldName) {
            toSelect = focusFieldName;
            $timeout(selectFocusField, wait);
          }
        }
      };

      ClassDef.prototype.focusReset = function() {
        resetAll();
      };

      //---

      // return class definiton
      return ClassDef;

    })();

    //---

    var instanceCache = {};

    var service = {
      get: getInstance
    };

    return service;

    //---

    function getInstance(name) {
      var instance = instanceCache[name];
      if(instance) {
        return instance;
      } else {
        instance = new InputFocus(name);
        instanceCache[name] = instance;
        return instance;
      }
    }

  }

});
