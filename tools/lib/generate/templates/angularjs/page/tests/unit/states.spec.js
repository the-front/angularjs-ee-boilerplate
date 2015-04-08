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

        describe("content", function() {

          var content;

          it("should be defined", function() {
            // arrange
            /*jshint sub:true*/
            content = views['content@<%= name %>'];

            // assertions
            expect(content).toBeDefined();
          });

          it("should map to templateUrl \'<%= location %>/template.html\'", function() {
            expect(content.templateUrl).toEqual('<%= location %>/template.html');
          });

          it("should map to controller \'<%= helpers.capitalize( name ) %>Ctrl\'", function() {
            expect(content.controller).toEqual('<%= helpers.capitalize( name ) %>Ctrl');
          });

          it("should map to controllerAs \'vm\'", function() {
            expect(content.controllerAs).toEqual('vm');
          });

        });

      });

    });

  }); //--- end: States Map

});
