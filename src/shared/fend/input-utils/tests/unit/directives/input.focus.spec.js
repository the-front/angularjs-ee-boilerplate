describe("Testing fend.input.utils Input Focus Directive", function() {

  var scope, compile, doc, body;

  // excuted before each "it" is run
  beforeEach(function() {

    // load the module
    module('fend.input.utils');

    // inject dependencies
    inject(function($rootScope, $compile, $document) {
      scope = $rootScope.$new();
      compile = $compile;
      doc = $document;
    });

    body = angular.element(doc[0].body);

  });

  describe("as attribute", function() {

    var fieldName = 'inputField',
        modelName = 'inputFieldModel',
        focusName = 'focusInputField';

    var element;

    beforeEach(function() {

      scope[focusName] = false;
      scope[modelName] = 'some value';

      element = compile('<input type="text" name="'+fieldName+'" ng-model="'+modelName+'" fend-focus="'+focusName+'">')(scope);
      scope.$digest();
      body.append(element); // important to receive focus test

    });


    it("should have fend-focus attribute equals to " + focusName, function() {

      // assertions
      expect(element.attr('fend-focus')).toEqual(focusName);

    });


    it("should receive focus", function() {

      // act
      scope[focusName] = true;
      scope.$digest();

      // assertions
      expect(document.activeElement === element[0]).toBeTruthy();

    });


  });

});
