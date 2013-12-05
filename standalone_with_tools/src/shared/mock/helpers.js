angular.module('ngMockBackend').factory(

  // factory name
  'Helpers', 

  // factory dependencies injection
  [

// factory definition
function() {

  var Helpers = (function() {

    // constructor
    var Helpers = function() {};
    var ClassDef = Helpers;
    //---
    
    ClassDef.prototype.getIdFromURL = function(url, regexp) {
      var arr = url.split(regexp); // ex.: /bookmarks\//
      if(arr.length > 1) return parseInt(arr[1], 10);
      return null;
    };

    ClassDef.prototype.getValueFromURL = function(url, regexp) { 
      var find = null,
          arr = url.split(regexp); // ex.: /bookmarks\/search\//
      if(arr.length > 1) {
        find = arr[1];
        arr = find.split(/\?/);
        if(arr.length > 1) find = arr[0];
      }
      return find;
    };

    ClassDef.prototype.createResultMessage = function(_code, _message) {
      return {
        code: _code,
        message: _message
      };
    };

    ClassDef.prototype.notFound = function(id) {
      var msg = 'Not found';
      if(id) msg += ' - id: ' + id;
      return createResultMessage(404, msg);
    };

    ClassDef.prototype.paginate = function(data, options) {
      
      if(!options || 'object' !== typeof options) {
        options = {
          page: 1,
          size: 10
        };
      } else {
        if(!options.hasOwnProperty('size')) options.size = 10;
        else if(options.size < 2) options.size = 2;
      }

      if(options.page <= 0) options.page = 1;

      //---

      var result = {
        data: [],
        count: 0,
        page: 1,
        pages: 1
      };

      //---

      var page = [];
      var i, count, length, limit, flag;      

      count = 0;
      length = data.length;
      i = ((options.page-1) * options.size);
      limit = options.size;

      if(i < length) {
        flag = true;
      } else {
        flag = false;
      }

      while(flag) {

        page.push(data[i]);

        i++; count++;

        if(i<length && count<limit) {
          flag = true;
        } else {
          flag = false;
        }
      }
      
      result.count = length;
      result.data = page;
      result.page = options.page;
      result.pages = Math.ceil(length / options.size);    

      return result;
    };

    // return Class Definition
    return ClassDef;
  })();

  //---

  return new Helpers();

}]);