describe('Angular.js \'bookmarks\' Routes', function() {

  var route;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('bookmarks');

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

    describe('location \'/bookmarks\' - list booksmarks', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/bookmarks']).toBeDefined();

      });

      it('should map to controller BookmarksListCtrl as vm', function() {

        var check = route.routes['/bookmarks'];

        // assertions
        expect(check.controller).toBe('BookmarksListCtrl');
        expect(check.controllerAs).toBe('vm');

      });

      it('should map to templateUrl app/bookmarks/templates/list.html', function() {

        // assertions
        expect(route.routes['/bookmarks'].templateUrl).toEqual('app/bookmarks/templates/list.html');

      });

    });


    describe('location \'/bookmarks/search\' - search booksmarks', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/bookmarks/search']).toBeDefined();

      });

      it('should map to controller BookmarksSearchCtrl as vm', function() {

        var check = route.routes['/bookmarks/search'];

        // assertions
        expect(check.controller).toBe('BookmarksSearchCtrl');
        expect(check.controllerAs).toBe('vm');

      });

      it('should map to templateUrl app/bookmarks/templates/search.html', function() {

        // assertions
        expect(route.routes['/bookmarks/search'].templateUrl).toEqual('app/bookmarks/templates/search.html');

      });

    });


    describe('location \'/bookmarks/new\' - add new booksmark', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/bookmarks/new']).toBeDefined();

      });

      it('should map to controller BookmarksNewCtrl as vm', function() {

        var check = route.routes['/bookmarks/new'];

        // assertions
        expect(check.controller).toBe('BookmarksNewCtrl');
        expect(check.controllerAs).toBe('vm');

      });

      it('should map to templateUrl app/bookmarks/templates/form.html', function() {

        // assertions
        expect(route.routes['/bookmarks/new'].templateUrl).toEqual('app/bookmarks/templates/form.html');

      });

    });

    describe('location \'/bookmarks/edit/:id\' - edit booksmark', function() {

      it('should be defined', function() {

        // assertions
        expect(route.routes['/bookmarks/edit/:id']).toBeDefined();

      });

      it('should map to controller BookmarksEditCtrl as vm', function() {

        var check = route.routes['/bookmarks/edit/:id'];

        // assertions
        expect(check.controller).toBe('BookmarksEditCtrl');
        expect(check.controllerAs).toBe('vm');

      });

      it('should map to templateUrl app/bookmarks/templates/form.html', function() {

        // assertions
        expect(route.routes['/bookmarks/edit/:id'].templateUrl).toEqual('app/bookmarks/templates/form.html');

      });

    });


  }); //--- end: Routes Map

});
