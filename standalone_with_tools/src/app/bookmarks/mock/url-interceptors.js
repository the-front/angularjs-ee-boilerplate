angular.mock.backend.addResource(
  
  // mock resource dependencies injection
  ['BookmarksCollection', 'Helpers', '$httpBackend', 'regexpUrl', 'getParams',

// mock resource definition
function(bookmarks, helpers, $httpBackend, regexpUrl, getParams) {
  'use strict';

  //--- @begin: URL interceptor
  
    // get all
  $httpBackend.when('GET', regexpUrl(/rest\/bookmarks(\?|$)/))
    .respond(function(method, url, data) {
      console.log(url);

      var result,
          params = getParams(url),
          options = {page: 1, size: 10};

      if(params) {
        console.log(params);
        options.page = params.page;
        options.size = params.size;
      }

      result = bookmarks.list(options);

      return [200, angular.copy(result)];
    }); 

    // get one
  $httpBackend.when('GET', regexpUrl(/rest\/bookmarks(\/)?([A-z0-9]+)?$/))
    .respond(function(method, url, data) {
      console.log('GET ' + url);

      var result,
          regexp = /bookmarks\//,
          id = helpers.getIdFromURL(url, regexp);

      if(id) {
        result = [200, angular.copy(bookmarks.getById(id))];
      } else {
        result = [404, helpers.notFound(id)];
      }

      return result;
    }); 

    // create
  $httpBackend.when('POST', regexpUrl(/rest\/bookmarks$/))
    .respond(function(method, url, data) {
      console.log('POST ' + url);

      data = angular.fromJson(data);
      //data.id = seq++;

      data = bookmarks.insert(data);
      console.log(data);

      return [201, angular.copy(data)];
    }); 

    // update
  $httpBackend.when('PUT', regexpUrl(/rest\/bookmarks(\/)?([A-z0-9]+)?$/))
    .respond(function(method, url, data) {
      console.log('PUT ' + url);

      data = angular.fromJson(data);

      bookmarks.update(data);
      console.log(data);

      return [202, angular.copy(data)];
    }); 

    // delete
  $httpBackend.when('DELETE', regexpUrl(/rest\/bookmarks(\/)?([A-z0-9]+)?$/))
    .respond(function(method, url, data) {
      console.log('DELETE ' + url);

      var result, 
          bookmark,
          regexp = /bookmarks\//,
          id = helpers.getIdFromURL(url, regexp);

      if(id) {
        bookmark = bookmarks.getById(id);
        bookmarks.remove(bookmark);
        result = [202, helpers.createResultMessage(202, 'Bookmark id: ' + id + ' removed')];
      } else {
        result = [404, helpers.notFound(id)];
      }

      return result;

    }); 

    // search
  $httpBackend.when('GET', regexpUrl(/rest\/bookmarks\/search\/([A-z0-9]+)(\?|$)/))
    .respond(function(method, url, data) {
      console.log('GET ' + url);

      var result,
          regexp = /bookmarks\/search\//,
          find = helpers.getValueFromURL(url, regexp),
          params = getParams(url),
          options = {page: 1, size: 10};

      if(params) {
        console.log(params);
        options.page = params.page;
        options.size = params.size;
      }

      console.log(find);

      result = bookmarks.search(find, options);

      return [200, angular.copy(result)];
    }); 

  //--- @end: URL interceptor
  


  console.log(bookmarks.getById(1));
  console.log(bookmarks.search('erko'));
  console.log(bookmarks.list());

}]);