describe('ui.router: \'<%= name %>\'', function() {

  var state;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('<%= name %>');

    // inject dependencies
    inject(function($state) {
      state = $state;
    });

  });

  describe("States Map", function() {

    it("$state should be defined", function() {
      expect(state).toBeDefined();
    });

    describe("<%= name %> state", function() {

      var config;

      it("should be defined", function() {
        // arrange
        config = state.get('<%= name %>');

        // assertions
        expect(config).toBeDefined();
      });

      it("should be abstract", function() {
        expect(config.abstract).toBeTruthy();
      });

      it("should map url to \'/<%= route %>\'", function() {
        expect(config.url).toEqual('/<%= route %>');
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

    }); //--- end: <%= name %> state

    describe("<%= name %>.list state", function() {

      stateSpecs({
        state         : '<%= name %>.list',
        url           : '/list',
        templateUrl   : '<%= location %>/templates/list.html',
        controller    : '<%= helpers.capitalize( name ) %>ListCtrl',
        controllerAs  : 'vm'
      });

    }); //--- end: <%= name %>.list state

    describe("<%= name %>.search state", function() {

      stateSpecs({
        state         : '<%= name %>.search',
        url           : '/search',
        templateUrl   : '<%= location %>/templates/search.html',
        controller    : '<%= helpers.capitalize( name ) %>SearchCtrl',
        controllerAs  : 'vm'
      });

    }); //--- end: <%= name %>.search state

    describe("<%= name %>.new state", function() {

      stateSpecs({
        state         : '<%= name %>.new',
        url           : '/new',
        templateUrl   : '<%= location %>/templates/form.html',
        controller    : '<%= helpers.capitalize( name ) %>NewCtrl',
        controllerAs  : 'vm'
      });

    }); //--- end: <%= name %>.new state

    describe("<%= name %>.edit state", function() {

      stateSpecs({
        state         : '<%= name %>.edit',
        url           : '/edit/:id',
        templateUrl   : '<%= location %>/templates/form.html',
        controller    : '<%= helpers.capitalize( name ) %>EditCtrl',
        controllerAs  : 'vm'
      });

    }); //--- end: <%= name %>.edit state

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
