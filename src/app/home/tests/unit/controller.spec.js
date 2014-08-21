describe('Testing Home Controller', function() {

  var ctrl, scope;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('home');

    // inject dependencies
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      ctrl = $controller('HomeCtrl', {
        $scope: scope
      });
    });

  });


  it('should have a pageName equals to \'Home Page\'', function() {
    expect(scope.pageName).toEqual('Home Page');
  });

});
