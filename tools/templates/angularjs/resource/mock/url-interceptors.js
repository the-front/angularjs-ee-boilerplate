define(
// require.js dependency injection
[
  'angular',
  'shared/mock/backend',

  './data'
],

// require.js module scope
function(ng, backend) {
  'use strict';


  backend.addResource(

    // mock resource dependencies injection
    [
      '<%= helpers.capitalize( name ) %>Collection', 'Helpers',
      '$httpBackend', 'regexpUrl', 'getParams',
      '$log',

  // mock resource definition
  function(collection, helpers, $httpBackend, regexpUrl, getParams, console) {

    //--- @begin: URL interceptor

      // get all
    $httpBackend.when('GET', regexpUrl(/<%= helpers.stringRegExpEscape( endpoint ) %>(\?|$)/))
      .respond(function(method, url, data) {

        console.debug('GET ' + url);

        var result,
            params = getParams(url),
            options = {page: 1, size: 10};

        if(params) {
          console.debug(params);
          options.page = params.page;
          options.size = params.size;
        }

        result = collection.list(options);

        return [200, angular.copy(result)];
      });

      // get one
    $httpBackend.when('GET', regexpUrl(/<%= helpers.stringRegExpEscape( endpoint ) %>(\/)?([A-z0-9]+)?$/))
      .respond(function(method, url, data) {
        console.debug('GET ' + url);

        var result,
            regexp = /<%= name %>\//,
            id = helpers.getIdFromURL(url, regexp),
            object = collection.getById(id);

        if(object) {
          result = [200, angular.copy(object)];
        } else {
          result = [404, helpers.notFound(id)];
        }

        return result;
      });

      // create
    $httpBackend.when('POST', regexpUrl(/<%= helpers.stringRegExpEscape( endpoint ) %>$/))
      .respond(function(method, url, data) {
        console.debug('POST ' + url);

        data = angular.fromJson(data);
        data = collection.insert(data);

        console.debug(data);

        return [201, angular.copy(data)];
      });

      // update
    $httpBackend.when('PUT', regexpUrl(/<%= helpers.stringRegExpEscape( endpoint ) %>(\/)?([A-z0-9]+)?$/))
      .respond(function(method, url, data) {
        console.log('PUT ' + url);

        data = angular.fromJson(data);

        collection.update(data);

        console.debug(data);

        return [202, angular.copy(data)];
      });

      // delete
    $httpBackend.when('DELETE', regexpUrl(/<%= helpers.stringRegExpEscape( endpoint ) %>(\/)?([A-z0-9]+)?$/))
      .respond(function(method, url, data) {
        console.debug('DELETE ' + url);

        var result,
            bookmark,
            regexp = /<%= name %>\//,
            id = helpers.getIdFromURL(url, regexp),
            object = collection.getById(id);

        if(object) {
          collection.remove(object);
          result = [202, helpers.createResultMessage(202, '<%= helpers.capitalize( name ) %> id: ' + id + ' removed')];
        } else {
          result = [404, helpers.notFound(id)];
        }

        return result;

      });

    //--- @end: URL interceptor


    /*
    console.debug(collection.getById(1));
    console.debug(collection.list());
    */

  }]);

});
