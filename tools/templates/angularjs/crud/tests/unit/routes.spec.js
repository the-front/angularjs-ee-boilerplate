describe('Angular.js \'<%= name %>\' Routes', function() {

  var route;

  beforeEach(function() {
    module('<%= name %>');

    inject(function($route) {
      route = $route;
    });
  });

  describe('Routes Map', function() {


    describe('location \'/<%= route %>\' - list <%= name %>', function() {

      it('should be defined', function() {
        expect(route.routes['/<%= route %>']).toBeDefined();
      });

      it('should map to controller <%= helpers.capitalize( name ) %>ListCtrl', function() {
        expect(route.routes['/<%= route %>'].controller).toBe('<%= helpers.capitalize( name ) %>ListCtrl');
      });

      it('should map to templateUrl <%= location %>/templates/list.html', function() {
        expect(route.routes['/<%= route %>'].templateUrl).toEqual('<%= location %>/templates/list.html');
      });

    });


    describe('location \'/<%= route %>/search\' - search <%= name %>', function() {

      it('should be defined', function() {
        expect(route.routes['/<%= route %>/search']).toBeDefined();
      });

      it('should map to controller <%= helpers.capitalize( name ) %>SearchCtrl', function() {
        expect(route.routes['/<%= route %>/search'].controller).toBe('<%= helpers.capitalize( name ) %>SearchCtrl');
      });

      it('should map to templateUrl <%= location %>/templates/search.html', function() {
        expect(route.routes['/<%= route %>/search'].templateUrl).toEqual('<%= location %>/templates/search.html');
      });

    });


    describe('location \'/<%= route %>/new\' - add new <%= name %>', function() {

      it('should be defined', function() {
        expect(route.routes['/<%= route %>/new']).toBeDefined();
      });

      it('should map to controller <%= helpers.capitalize( name ) %>NewCtrl', function() {
        expect(route.routes['/<%= route %>/new'].controller).toBe('<%= helpers.capitalize( name ) %>NewCtrl');
      });

      it('should map to templateUrl <%= location %>/templates/form.html', function() {
        expect(route.routes['/<%= route %>/new'].templateUrl).toEqual('<%= location %>/templates/form.html');
      });

    });


    describe('location \'/<%= route %>/edit/:id\' - edit <%= name %>', function() {

      it('should be defined', function() {
        expect(route.routes['/<%= route %>/edit/:id']).toBeDefined();
      });

      it('should map to controller <%= helpers.capitalize( name ) %>EditCtrl', function() {
        expect(route.routes['/<%= route %>/edit/:id'].controller).toBe('<%= helpers.capitalize( name ) %>EditCtrl');
      });

      it('should map to templateUrl <%= location %>/templates/form.html', function() {
        expect(route.routes['/<%= route %>/edit/:id'].templateUrl).toEqual('<%= location %>/templates/form.html');
      });

    });


  }); //--- end: Routes Map

});
