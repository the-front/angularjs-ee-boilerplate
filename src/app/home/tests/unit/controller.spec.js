describe('Testing Home Controller', function() {

  var vm;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('home');

    // inject dependencies
    inject(function($controller) {

      vm = $controller('HomeCtrl');

    });

  });


  it('should have a pageName equals to \'Home Page\'', function() {

    // assertions
    expect(vm.pageName).toEqual('Home Page');

  });

  it("should call success toaster...", function() {

    // assertions
    expect(vm.popup('success')).toEqual('toaster success');

  });

});
