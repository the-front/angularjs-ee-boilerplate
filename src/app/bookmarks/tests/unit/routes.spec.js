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

      it('should map to controller BookmarksListCtrl', function() {

        // assertions
        expect(route.routes['/bookmarks'].controller).toBe('BookmarksListCtrl');

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

      it('should map to controller BookmarksSearchCtrl', function() {

        // assertions
        expect(route.routes['/bookmarks/search'].controller).toBe('BookmarksSearchCtrl');

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

      it('should map to controller BookmarksNewCtrl', function() {

        // assertions
        expect(route.routes['/bookmarks/new'].controller).toBe('BookmarksNewCtrl');

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

      it('should map to controller BookmarksEditCtrl', function() {

        // assertions
        expect(route.routes['/bookmarks/edit/:id'].controller).toBe('BookmarksEditCtrl');

      });

      it('should map to templateUrl app/bookmarks/templates/form.html', function() {

        // assertions
        expect(route.routes['/bookmarks/edit/:id'].templateUrl).toEqual('app/bookmarks/templates/form.html');

      });

    });


  }); //--- end: Routes Map

});
