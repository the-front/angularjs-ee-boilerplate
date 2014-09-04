describe('Angular.js \'<%= name %>\' Routes', function() {

  var route;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('<%= name %>');

    // inject dependencies
    inject(function($route) {
      route = $route;
    });

  });

  describe('Routes Map', function() {

    describe('location \'/<%= route %>\'', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/<%= route %>']).toBeDefined();

      });

      it('should map to controller <%= helpers.capitalize( name ) %>Ctrl', function() {

        // assertions
        expect(route.routes['/<%= route %>'].controller).toBe('<%= helpers.capitalize( name ) %>Ctrl');

      });

      it('should map to templateUrl <%= location %>/template.html', function() {

        // assertions
        expect(route.routes['/<%= route %>'].templateUrl).toEqual('<%= location %>/template.html');

      });

    });

  }); //--- end: Routes Map

});
