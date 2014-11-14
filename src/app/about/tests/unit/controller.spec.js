describe('Testing About Controller', function() {

  var vm;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('about');

    // inject dependencies
    inject(function($controller) {

      vm = $controller('AboutCtrl');

    });

  });


  it('should have a pageName equals to \'About Page\'', function() {

    // assertions
    expect(vm.pageName).toEqual('About Page');

  });

});
