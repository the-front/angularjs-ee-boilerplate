define(function(require) {
  'use strict';

  var module = require('../module');

  module.factory('ProgressInterceptor', ProgressInterceptor);

  //---

  ProgressInterceptor.$inject = ['$q', '$cacheFactory', 'ProgressStatus'];

  function ProgressInterceptor($q, $cacheFactory, status) {

    /**
      * The total number of requests made
      */
    var reqsTotal = 0;

    /**
      * The number of requests completed (either successfully or not)
      */
    var reqsCompleted = 0;

    var httpDefaults;

    var service = {
      setHttpProviderDefaults: setHttpProviderDefaults,
      request: handleRequest,
      response: handleResponse,
      responseError: handleResponseError
    };

    return service;

    //---

    // @begin: inject header defaults
    function setHttpProviderDefaults(httpProvider) {
      httpDefaults = httpProvider.defaults;
    }
    // @end: inject header defaults

    function setStart() {
      status.start();
    }

    function setProgress() {
      status.progress(reqsCompleted / reqsTotal);
    }

    function setComplete() {
      status.complete();

      reqsCompleted = 0;
      reqsTotal = 0;
    }

    /**
      * Determine if the response has already been cached
      * @param  {Object}  config the config option from the request
      * @return {Boolean} retrns true if cached, otherwise false
      */
    function isCached(config) {
      var cache;
      var defaults = httpDefaults;

      if (config.method !== 'GET' || config.cache === false) {
        config.cached = false;
        return false;
      }

      if (config.cache === true && defaults.cache === undefined) {
        cache = $cacheFactory.get('$http');
      } else if (defaults.cache !== undefined) {
        cache = defaults.cache;
      } else {
        cache = config.cache;
      }

      var cached = cache !== undefined ?
        cache.get(config.url) !== undefined : false;

      if (config.cached !== undefined && cached !== config.cached) {
        return config.cached;
      }
      config.cached = cached;
      return cached;
    }

    function handleRequest(config) {
      if (!isCached(config)) {
        if (reqsTotal === 0) {
          setStart();
        }
        reqsTotal++;
      }
      return config;
    }

    function handleResponse(response) {
      if (!angular.isDefined(response)) {
        console.error('No response defined. Aborting operation.');
        setComplete();
        return $q.reject(response);
      }

      if (!isCached(response.config)) {
        reqsCompleted++;
        if (reqsCompleted >= reqsTotal) {
          setComplete();
        } else {
          setProgress();
        }
      }
      return response;
    }

    function handleResponseError(rejection) {
      if (!isCached(rejection.config)) {
        reqsCompleted++;
        if (reqsCompleted >= reqsTotal) {
          setComplete();
        } else {
          setProgress();
        }
      }
      return $q.reject(rejection);
    }

  }


});
