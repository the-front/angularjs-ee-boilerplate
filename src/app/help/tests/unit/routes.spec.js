describe('Angular.js \'help\' Routes', function() {

  var route;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('help');

    // inject dependencies
    inject(function($route) {
      route = $route;
    });

  });

  /* only to check if injection work fine */
  it('should be defined', function() {

    // assertions
    expect(route).toBeDefined();

  });

  describe('Routes Map', function() {

    describe('location \'/help\'', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/help']).toBeDefined();

      });

      it('should map to controller HelpCtrl as help', function() {

        // assertions
        expect(route.routes['/help'].controller).toBe('HelpCtrl as help');

      });

      it('should map to templateUrl app/help/template.html', function() {

        // assertions
        expect(route.routes['/help'].templateUrl).toEqual('app/help/template.html');

      });

    });


  }); //--- end: Routes Map

});
