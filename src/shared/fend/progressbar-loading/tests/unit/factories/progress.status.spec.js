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

    // arrange
    spyOn(rootScope, '$emit');

  });


  it("should be registered", function() {

    // assertions
    expect(status).toBeDefined();

  });

  it("should start progress", function() {

    // act
    status.start();

    // assertions
    expect(rootScope.$emit).toHaveBeenCalledWith('loadingbar:start:event');


  });

  it("should set progress value", function() {

    // arrange
    var value = 42;

    // act
    status.progress(value);

    // assertions
    expect(rootScope.$emit).toHaveBeenCalledWith('loadingbar:progress:event', value*100);

  });

  it("should complete progress", function() {

    // act
    status.complete();

    // assertions
    expect(rootScope.$emit).toHaveBeenCalledWith('loadingbar:complete:event');

  });

});
