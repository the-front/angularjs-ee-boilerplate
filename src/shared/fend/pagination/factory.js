define(function(require) {
  'use strict';

  var module = require('./module');

  module.factory(

    // factory name
    'PaginationFactory',

  // dependencies injection
  [ //'$rootScope',

  // factory definition
  function() {

    var Pagination = (function() {

      // private

      // private functions
      function defaultMetainf(_pageSize) {

        function PaginationMetaInfo() {
          this.pageSize = _pageSize || 10;
          this.count = 0;
          this.nextPage = 1;
          this.lastPage = 0;
          this.lastPageSize = 0;
          this.totalPages = 0;

          this.ts = new Date().getTime();
        }

        return new PaginationMetaInfo();
      }


      // constructor
      // inject dependencies when instantiate new object
      var Pagination = function(paginationFor) {
        this.classInfo = 'Pagination for: ' + paginationFor;
        this.metainf = defaultMetainf();
      };
      var ClassDef = Pagination;
      //---

      // public attributes

      // public functions
      ClassDef.prototype.resetPageSize = function(value) {
        this.metainf = defaultMetainf(value);
      };

      //---

      ClassDef.prototype.getPageSize = function() {
        return this.metainf.pageSize;
      };

      //---

      ClassDef.prototype.setNextPage = function(value) {
        this.metainf.nextPage = parseInt(value);
      };

      ClassDef.prototype.getNextPage = function() {
        return this.metainf.nextPage;
      };

      //---

      ClassDef.prototype.updateMetainf = function(count, lastPageSize, lastPage, totalPages) {
        this.metainf.count = parseInt(count);
        this.metainf.lastPageSize = parseInt(lastPageSize);
        this.metainf.lastPage = parseInt(lastPage);
        this.metainf.totalPages = parseInt(totalPages);
      };

      //---

      ClassDef.prototype.addCheck = function() {
        var modFlag = ((this.metainf.count % this.getPageSize()) === 0);

        if(modFlag) {
          this.setNextPage(this.metainf.totalPages+1);
        } else {
          this.setNextPage(this.metainf.totalPages);
        }
      };

      ClassDef.prototype.removeCheck = function() {
        if( this.metainf.lastPageSize == 1 ) {
          var nextPage = this.metainf.totalPages-1;
          if(nextPage <= 0) nextPage = 0;
          this.setNextPage(nextPage);
        }
      };

      //---

      // return class definiton
      return ClassDef;

    })();

    //---

    var instanceCache = {};

    function getInstance(name) {
      var instance = instanceCache[name];
      if(instance) {
        return instance;
      } else {
        instance = new Pagination(name);
        instanceCache[name] = instance;
        return instance;
      }
    }

    return {
      get: function(name) {
        return getInstance(name);
      }
    };

  }]);

});
