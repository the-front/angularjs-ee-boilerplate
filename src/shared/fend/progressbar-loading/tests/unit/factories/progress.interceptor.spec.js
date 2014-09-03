describe("Testing fend.progressbar.loading Progress Interceptor Factory", function() {

  // https://jbavari.github.io/blog/2014/06/20/testing-interceptor-headers-in-angularjs/

  var rootScope, interceptor;

    // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('fend.progressbar.loading');

    // inject dependencies
    inject(function($rootScope, ProgressInterceptor) {

      rootScope = $rootScope;

      interceptor = ProgressInterceptor;

    });

  });


  it("should be registered", function() {
    expect(interceptor).not.toEqual(null);
  });

  // TODO: define tests

});
