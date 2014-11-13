describe('Testing Help Controller', function() {

  var ctrl, httpBackend;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('help');

    // inject dependencies
    inject(function($controller, $httpBackend) {

      ctrl = $controller('HelpCtrl');

      httpBackend = $httpBackend;

    });

  });


  it('should have a pageName equals to \'Help Page\'', function() {

    // assertions
    expect(ctrl.pageName).toEqual('Help Page');

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
      expect(ctrl.githubUser.login).toEqual(find);

    });

  });

});
