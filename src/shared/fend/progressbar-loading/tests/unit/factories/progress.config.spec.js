describe("Testing fend.progressbar.loading Progress Config Factory", function() {

  var rootScope, config;

    // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('fend.progressbar.loading');

    // inject dependencies
    inject(function($rootScope, ProgressConfig) {

      rootScope = $rootScope;

      config = ProgressConfig;

    });

  });


  it("should be registered", function() {
    expect(config).not.toEqual(null);
  });

  // TODO: define tests

});
