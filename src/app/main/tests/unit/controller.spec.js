describe('Testing Main Controller', function() {

  var ctrl;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('main');

    // inject dependencies
    inject(function($controller) {

      ctrl = $controller('MainCtrl');

    });

  });


  it('should be defined', function() {

    // assertions
    expect(ctrl).toBeDefined();

  });

  it("should appLoaded to be 'ok'", function() {

    // assertions
    expect(ctrl.appLoaded).toEqual('ok');

  });

});
