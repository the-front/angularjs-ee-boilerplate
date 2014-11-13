describe('Testing Home Controller', function() {

  var ctrl;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('home');

    // inject dependencies
    inject(function($controller) {

      ctrl = $controller('HomeCtrl');

    });

  });


  it('should have a pageName equals to \'Home Page\'', function() {

    // assertions
    expect(ctrl.pageName).toEqual('Home Page');

  });

  it("should call success toaster...", function() {

    // assertions
    expect(ctrl.popup('success')).toEqual('toaster success');

  });

});
