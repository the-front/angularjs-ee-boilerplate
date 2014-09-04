describe("Testing fend.progressbar.loading Progress Interceptor Factory", function() {

  /*
    Testing Interceptor Headers in AngularJS | Josh Bavari's Ramblings
    https://jbavari.github.io/blog/2014/06/20/testing-interceptor-headers-in-angularjs/
  */

  var rootScope, interceptor, httpProviderIt, http, httpBackend;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('fend.progressbar.loading', function($httpProvider) {
      //save our interceptor
      httpProviderIt = $httpProvider;
    });

    // inject dependencies
    inject(function($rootScope, ProgressInterceptor, $http, $httpBackend) {

      rootScope = $rootScope;

      interceptor = ProgressInterceptor;

      http = $http;

      httpBackend = $httpBackend;

    });

  });


  it("should be registered", function() {

    // assertions
    expect(interceptor).toBeDefined();

  });

  describe("HTTP tests", function() {

    it('should have the ProgressInterceptorDefined as an interceptor', function () {

      // assertions
      expect(httpProviderIt.interceptors).toContain('ProgressInterceptorDefined');

    });

    it("should send POST request", function() {

      // arrange
      var url = '/someUrl';

      httpBackend.when('POST', url)
        .respond(function(method, url, data) {
          data = angular.fromJson(data);

          // assertion
          expect(data.msg).toEqual('hello world');

          data.msg = 'POST ok';
          return [200, angular.copy(data)];
        });

      // act
      http.post(url, {msg: 'hello world'})
        .success(function(data, status) {

          // assertion
          expect(data.msg).toEqual('POST ok');

        });
      httpBackend.flush();

    });

    it("should send one GET request", function() {

      // arrange
      httpBackend.when('GET', '/someUrl').
        respond(function(method, url, data) {
          return [200, 'ok'];
        });

      // act
      http.get('/someUrl').success(function(data, status) {

        // assertions
        expect(data).toEqual('ok');
        expect(status).toEqual(200);

      });
      httpBackend.flush();

    });

    it("should send two GET request", function() {

      // arrange
      var url = '/someUrl/';

      var commonRespond = function(method, url, data) {
        return [200, 'ok'];
      };

      httpBackend.when('GET', url+'1').respond(commonRespond);
      httpBackend.when('GET', url+'2').respond(commonRespond);

      var checkSuccess = function(data, status) {
        // assertions
        expect(data).toEqual('ok');
        expect(status).toEqual(200);
      };

      // act
      http.get(url+'1').success(checkSuccess);
      http.get(url+'2').success(checkSuccess);
      httpBackend.flush();

    });

    it("should GET response error", function() {

      // arrange
      httpBackend.when('GET', '/someUrl').
        respond(function(method, url, data) {
          return [500, 'Oops'];
        });

      // act
      http.get('/someUrl').error(function(data, status) {
        // assertions
        expect(data).toEqual('Oops');
        expect(status).toEqual(500);
      });
      httpBackend.flush();

    });

    it("should GET two response error", function() {

      // arrange
      var url = '/someUrl/';

      var commonRespond = function(method, url, data) {
        return [500, 'Oops'];
      };

      httpBackend.when('GET', url+'1').respond(commonRespond);
      httpBackend.when('GET', url+'2').respond(commonRespond);

      var checkError = function(data, status) {
        // assertions
        expect(data).toEqual('Oops');
        expect(status).toEqual(500);
      };

      // act
      http.get(url+'1').error(checkError);
      http.get(url+'2').error(checkError);
      httpBackend.flush();

    });

  });

});
