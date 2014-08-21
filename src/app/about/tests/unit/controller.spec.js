describe('Testing About Controller', function() {

  var ctrl, scope;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('about');

    // inject dependencies
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      ctrl = $controller('AboutCtrl', {
        $scope: scope
      });
    });

  });


  it('should have a pageName equals to \'About Page\'', function() {
    expect(scope.pageName).toEqual('About Page');
  });

});
