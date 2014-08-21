describe('Testing Help Controller', function() {

  var ctrl, scope, httpBackend;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('help');

    // inject dependencies
    inject(function($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();

      ctrl = $controller('HelpCtrl', {
        $scope: scope
      });

      httpBackend = $httpBackend;
    });

  });


  it('should have a pageName equals to \'Help Page\'', function() {
    expect(scope.pageName).toEqual('Help Page');
  });


  describe("Request GitHub user", function() {

    it("Success", function() {
      // arrange
      var find = 'erkobridee';

      httpBackend.when('GET', 'https://api.github.com/users/'+find )
        .respond(function(method, url, data) {
          return [200, {login: find}];
        });

      // act
      httpBackend.flush();

      // assertions
      expect(scope.githubUser.login).toEqual(find);
    });

  });

});
