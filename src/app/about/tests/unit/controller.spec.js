describe('Testing About Controller', function() {

  var ctrl;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('about');

    // inject dependencies
    inject(function($controller) {

      ctrl = $controller('AboutCtrl');

    });

  });


  it('should have a pageName equals to \'About Page\'', function() {

    // assertions
    expect(ctrl.pageName).toEqual('About Page');

  });

});
