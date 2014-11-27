describe('ui.router: \'bookmarks\'', function() {

  var state;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('bookmarks');

    // inject dependencies
    inject(function($state) {
      state = $state;
    });

  });

  describe("States Map", function() {

    it("$state should be defined", function() {
      expect(state).toBeDefined();
    });

    describe("bookmarks state", function() {

      var config;

      it("should be defined", function() {
        // arrange
        config = state.get('bookmarks');

        // assertions
        expect(config).toBeDefined();
      });

      it("should be abstract", function() {
        expect(config.abstract).toBeTruthy();
      });

      it("should map url to \'/bookmarks\'", function() {
        expect(config.url).toEqual('/bookmarks');
      });

      describe("views", function() {

        var views;

        it("should be defined", function() {
          // arrange
          views = config.views;

          // assertions
          expect(views).toBeDefined();
        });

        describe("master", function() {

          var master;

          it("should be defined", function() {
            // arrange
            /*jshint sub:true*/
            master = views['master'];

            // assertions
            expect(master).toBeDefined();
          });

          it("should map to templateUrl \'app/main/templates/layout.html\'", function() {
            expect(master.templateUrl).toEqual('app/main/templates/layout.html');
          });

        });

      });

    }); //--- end: bookmarks state

    describe("bookmarks.list state", function() {

      stateSpecs({
        state         : 'bookmarks.list',
        url           : '/list',
        templateUrl   : 'app/bookmarks/templates/list.html',
        controller    : 'BookmarksListCtrl',
        controllerAs  : 'vm'
      });

    }); //--- end: bookmarks.list state

    describe("bookmarks.search state", function() {

      stateSpecs({
        state         : 'bookmarks.search',
        url           : '/search',
        templateUrl   : 'app/bookmarks/templates/search.html',
        controller    : 'BookmarksSearchCtrl',
        controllerAs  : 'vm'
      });

    }); //--- end: bookmarks.search state

    describe("bookmarks.new state", function() {

      stateSpecs({
        state         : 'bookmarks.new',
        url           : '/new',
        templateUrl   : 'app/bookmarks/templates/form.html',
        controller    : 'BookmarksNewCtrl',
        controllerAs  : 'vm'
      });

    }); //--- end: bookmarks.new state

    describe("bookmarks.edit state", function() {

      stateSpecs({
        state         : 'bookmarks.edit',
        url           : '/edit/:id',
        templateUrl   : 'app/bookmarks/templates/form.html',
        controller    : 'BookmarksEditCtrl',
        controllerAs  : 'vm'
      });

    }); //--- end: bookmarks.edit state

  }); //--- end: States Map

  //----------------------------------------------------------------------------

  function stateSpecs(check) {

    /*
    check = {
      state         : 'parent_state.state_name',
      url           : 'url location',
      templateUrl   : 'template path file',
      controller    : 'controller name',
      controllerAs  : 'controller alias'
    }
    */

    check.controllerAs = check.controllerAs || 'vm'; // default value

    describe(check.state + " state", function() {

      var config;

      it("should be defined", function() {
        // arrange
        config = state.get(check.state);

        // assertions
        expect(config).toBeDefined();
      });

      it("should map url to \'" + check.url + "\'", function() {
        expect(config.url).toEqual(check.url);
      });

      describe("views", function() {

        var views;

        it("should be defined", function() {
          // arrange
          views = config.views;

          // assertions
          expect(views).toBeDefined();
        });

        describe("content", function() {

          var content;
          var viewName = (check.state.split('.')[0]);

          it("should be defined", function() {
            // arrange
            /*jshint sub:true*/
            content = views['content@' + viewName];

            // assertions
            expect(content).toBeDefined();
          });

          it("should map to templateUrl \'" + check.templateUrl + "\'", function() {
            expect(content.templateUrl).toEqual(check.templateUrl);
          });

          it("should map to controller \'" + check.controller + "\'", function() {
            expect(content.controller).toEqual(check.controller);
          });

          it("should map to controllerAs \'" + check.controllerAs + "\'", function() {
            expect(content.controllerAs).toEqual(check.controllerAs);
          });

        });

      });

    });

  } //--- end: stateSpecs(check)

});
