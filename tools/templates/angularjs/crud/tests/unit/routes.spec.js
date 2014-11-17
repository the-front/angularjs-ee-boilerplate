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


    describe('location \'/<%= route %>\' - list <%= name %>', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/<%= route %>']).toBeDefined();

      });

      it('should map to controller <%= helpers.capitalize( name ) %>ListCtrl as vm', function() {

        var check = route.routes['/<%= route %>'];

        // assertions
        expect(check.controller).toBe('<%= helpers.capitalize( name ) %>ListCtrl');
        expect(check.controllerAs).toBe('vm');

      });

      it('should map to templateUrl <%= location %>/templates/list.html', function() {

        // assertions
        expect(route.routes['/<%= route %>'].templateUrl).toEqual('<%= location %>/templates/list.html');

      });

    });


    describe('location \'/<%= route %>/search\' - search <%= name %>', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/<%= route %>/search']).toBeDefined();

      });

      it('should map to controller <%= helpers.capitalize( name ) %>SearchCtrl as vm', function() {

        var check = route.routes['/<%= route %>/search'];

        // assertions
        expect(check.controller).toBe('<%= helpers.capitalize( name ) %>SearchCtrl');
        expect(check.controllerAs).toBe('vm');

      });

      it('should map to templateUrl <%= location %>/templates/search.html', function() {

        // assertions
        expect(route.routes['/<%= route %>/search'].templateUrl).toEqual('<%= location %>/templates/search.html');

      });

    });


    describe('location \'/<%= route %>/new\' - add new <%= name %>', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/<%= route %>/new']).toBeDefined();

      });

      it('should map to controller <%= helpers.capitalize( name ) %>NewCtrl as vm', function() {

        var check = route.routes['/<%= route %>/new'];

        // assertions
        expect(check.controller).toBe('<%= helpers.capitalize( name ) %>NewCtrl');
        expect(check.controllerAs).toBe('vm');

      });

      it('should map to templateUrl <%= location %>/templates/form.html', function() {

        // assertions
        expect(route.routes['/<%= route %>/new'].templateUrl).toEqual('<%= location %>/templates/form.html');

      });

    });


    describe('location \'/<%= route %>/edit/:id\' - edit <%= name %>', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/<%= route %>/edit/:id']).toBeDefined();

      });

      it('should map to controller <%= helpers.capitalize( name ) %>EditCtrl as vm', function() {

        var check = route.routes['/<%= route %>/edit/:id'];

        // assertions
        expect(check.controller).toBe('<%= helpers.capitalize( name ) %>EditCtrl');
        expect(check.controllerAs).toBe('vm');

      });

      it('should map to templateUrl <%= location %>/templates/form.html', function() {

        // assertions
        expect(route.routes['/<%= route %>/edit/:id'].templateUrl).toEqual('<%= location %>/templates/form.html');

      });

    });


  }); //--- end: Routes Map

});
