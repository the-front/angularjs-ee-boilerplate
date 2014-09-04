describe("Testing fend.input.utils Input Focus Factory", function() {

  var factory, scope, timeout;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('fend.input.utils');

    // inject dependencies
    inject(function(InputFocusFactory, $rootScope, $timeout) {

      factory = InputFocusFactory;

      scope = $rootScope.$new();

      timeout = $timeout;

    });

  });


  it("should be registered", function() {

    // assertions
    expect(module).toBeDefined();

  });

  describe("instance", function() {

    var focus;
    var inputName   = 'focusInput';
    var inputName2  = 'focusInput2';

    it("should get instance", function() {

      // act
      focus = factory.get('inputFocusInstance');

      // assertions
      expect(factory.get('inputFocusInstance')).toBeDefined();
      expect(focus.classInfo).toEqual('InputFocus for: inputFocusInstance');

    });

    it("should config", function() {

      // arrange
      scope[inputName] = true;

      // act
      focus.config(
        scope,
        [inputName]
      );

      // assertions
      expect(scope[inputName]).toBeFalsy();

    });

    it("should reset focus", function() {

      // arrange
      focus.config(
        scope,
        [inputName]
      );
      scope[inputName] = true;

      // act
      focus.focusReset();

      // assertions
      expect(scope[inputName]).toBeFalsy();

    });

    describe("focus", function() {

      // Angular unit tests - timeout, exception - JSFiddle
      // http://jsfiddle.net/eitanp461/vWecL/

      beforeEach(function() {

        focus = factory.get('inputFocusInstance');
        focus.config(
          scope,
          [inputName, inputName2]
        );

      });

      it("should set focus", function() {

        // act
        focus.setFocus(inputName);
        timeout.flush();

        // assertions
        expect(scope[inputName]).toBeTruthy();

      });

      it("should set focus with custom timeout", function() {

        // act
        focus.setFocus(inputName, 10);
        timeout.flush();

        // assertions
        expect(scope[inputName]).toBeTruthy();

      });

      it("should change focus", function() {

        // act
        focus.setFocus(inputName);
        timeout.flush();
        focus.setFocus(inputName2);
        timeout.flush();

        // assertions
        expect(scope[inputName2]).toBeTruthy();

      });

      it("should stay in same input", function() {

        // act
        focus.setFocus(inputName);
        timeout.flush();
        focus.setFocus(inputName);

        // assertions
        expect(function () {
          timeout.flush();
        }).toThrow();

      });

      it("should do nothing", function() {

        // act
        focus.setFocus(123);

        // assertions
        expect(function () {
          timeout.flush();
        }).toThrow();

      });

    });

  });

});
