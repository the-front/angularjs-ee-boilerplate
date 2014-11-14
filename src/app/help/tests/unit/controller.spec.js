describe('Testing Help Controller', function() {

  var vm;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('help');

    // inject dependencies
    inject(function($controller) {

      var githubUser = {login: 'erkobridee'};

      vm = $controller('HelpCtrl', {
        githubUser: githubUser
      });

    });

  });


  it('should have a pageName equals to \'Help Page\'', function() {

    // assertions
    expect(vm.pageName).toEqual('Help Page');

  });

  it("should have a githubUser equals to \'erkobridee\'", function() {

    // assertions
    expect(vm.githubUser.login).toEqual('erkobridee');

  });

});
