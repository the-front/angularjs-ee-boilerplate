describe('Testing Main Controller', function() {

  var ctrl, scope;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('main');

    // inject dependencies
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      ctrl = $controller('MainCtrl', {
        $scope: scope
      });
    });

  });


  it('should be defined', function() {
    expect( ctrl ).toBeDefined();
  });

});
