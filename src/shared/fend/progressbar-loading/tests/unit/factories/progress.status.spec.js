describe("Testing fend.progressbar.loading Progress Status Factory", function() {

  var rootScope, status;

    // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('fend.progressbar.loading');

    // inject dependencies
    inject(function($rootScope, ProgressStatus) {

      rootScope = $rootScope;

      status = ProgressStatus;

    });

  });


  it("should be registered", function() {
    expect(status).not.toEqual(null);
  });

  // TODO: define tests

});
