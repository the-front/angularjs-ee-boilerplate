define(
// require.js dependency injection
[
  './module'
], 

// require.js module scope
function(module) {
  'use strict';

  
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
        return {
          pageSize: _pageSize || 10,
          count: 0,
          nextPage: 1,
          lastPage: 0,
          lastPageSize: 0,
          totalPages: 0
        };
      }


      // constructor
      // inject dependencies when instantiate new object
      var Pagination = function(paginationFor) {
        if(paginationFor) this.classInfo = 'Pagination for: ' + paginationFor;
      };
      var ClassDef = Pagination; 
      //---

      // public attributes
      ClassDef.prototype.metainf = defaultMetainf();

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
        this.metainf.nextPage = value;
      };

      ClassDef.prototype.getNextPage = function() {
        return this.metainf.nextPage; 
      };

      //---

      ClassDef.prototype.updateMetainf = function(count, lastPageSize, lastPage, totalPages) {
        this.metainf.count = count;
        this.metainf.lastPageSize = lastPageSize;
        this.metainf.lastPage = lastPage;
        this.metainf.totalPages = totalPages;
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
        if(
          (this.metainf.page == this.metainf.pages) &&
          (this.metainf.lastPageSize == 1)
        ) {
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