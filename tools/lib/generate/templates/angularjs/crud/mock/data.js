define(function(require) {
  'use strict';

  var module = require('shared/mock/module');

  module.factory('<%= helpers.capitalize( name ) %>Collection', <%= helpers.capitalize( name ) %>CollectionFactory);

  //---

  <%= helpers.capitalize( name ) %>CollectionFactory.$inject = ['DataStore', 'Helpers', '$log'];

  function <%= helpers.capitalize( name ) %>CollectionFactory(DataStore, helpers, console) {

    console.debug('<%= helpers.capitalize( name ) %>Collection');

    /*
      options = {
        name: '',
        objType: '',
        hasOwnId: false, // save and use this 'id 'as '_id' inside collection?
        indicesArray: ['id'],
        fn: {
          searchValue: function(data, find) {},
          init: function( collection ) {}
        }
      }
    */
    var collection = DataStore.create({
      name: '<%= name %>',
      objType: '<%= helpers.capitalize( name ) %>',
      //hasOwnId: true,
      indicesArray: ['id', 'name'],
      fn: {
        searchValue: function(data, find) {

          if(!find) return [];

          var r = [], obj,
              regexp = new RegExp(find, 'i'),
              len = data.length;

          for (var i = 0; i < len; i++) {
            obj = data[i];

            if(obj.name.match(regexp) || obj.description.match(regexp))
              r.push(obj);
          }

          return r;

        },

        init: function( collection ) {

          console.debug( 'init <%= helpers.capitalize( name ) %>Collection' );

          var seq = 0;

          //---

          collection.insert({
            id:           seq++,
            name:         'Protractor',
            description:  'End to end testing for AngularJS :: ' +
                          'https://angular.github.io/protractor/'
          });
          collection.insert({
            id:           seq++,
            name:         'Protractor Tutorial',
            description:  'This is a simple tutorial that shows you how to set up Protractor and start running tests :: ' +
                          'https://angular.github.io/protractor/#/tutorial'
          });
          collection.insert({
            id:           seq++,
            name:         'Protractor Source Code',
            description:  '[GitHub] angular / protractor :: ' +
                          'https://github.com/angular/protractor'
          });

          //---

          for (var i = 42; i > 0; i--) {
            collection.insert({
              id          : seq,
              name        : 'fake <%= helpers.capitalize( name ) %> name ' + (seq+1),
              description : 'some fake <%= helpers.capitalize( name ) %> descrition ' + (seq+1)
            });
            seq++;
          }

        }
      }
    });


    function <%= helpers.capitalize( name ) %>Collection() {}
    var ClassDef = helpers.extendsFn( <%= helpers.capitalize( name ) %>Collection, collection );

    ClassDef.prototype.sayMyName = function() {
      return 'Angular.js : <%= helpers.capitalize( name ) %>Collection Mock';
    };

    var instance = new <%= helpers.capitalize( name ) %>Collection();

    console.debug( instance.sayMyName() );
    console.debug( instance );
    console.debug( instance.list() );

    return instance;

  }

});
