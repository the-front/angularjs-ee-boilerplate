define(
// require.js dependency injection
[
  'shared/mock/module'
],

// require.js module scope
function(module) {
  'use strict';


  module.factory(

    // factory name
    'BookmarksCollection',

    // factory dependencies injection
    ['DataStore', 'Helpers', '$log',

  // factory definition
  function(DataStore, helpers, console) {

    console.debug('BookmarksCollection');

    /*
      options = {
        name: '',
        objType: '',
        indicesArray: ['id'],
        fn: {
          searchValue: function(data, find) {},
          init: function( collection ) {}
        }
      }
    */
    var collection = DataStore.create({
      name: 'bookmarks',
      objType: 'Bookmark',
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

          console.log( 'init BookmarksCollection' );

          var seq = 0;

          function createObject(_id, _name, _description, _url) {
            return {
              id: _id,
              name: _name,
              description: _description,
              url: _url
            };
          }

          collection.insert( createObject(seq++, 'Twitter - Erko Bridee', '@ErkoBridee', 'https://twitter.com/erkobridee') );
          collection.insert( createObject(seq++, 'GitHub - Erko Bridee', 'github/erkobridee', 'https://github.com/erkobridee') );
          collection.insert( createObject(seq++, 'Delicious - Erko Bridee', 'delicious/erko.bridee', 'http://www.delicious.com/erko.bridee') );
          collection.insert( createObject(seq++, 'Site - Erko Bridee', 'Site : Erko Bridee', 'http://about.erkobridee.com/') );

          function fakeUrl() {
            return 'http://google.com/#q=' + seq + '%2B' + seq;
          }

          for (var i = 59; i >= 0; i--) {
            collection.insert( createObject(seq++, 'fake bookmark ' + (seq+1), 'some description to fake bookmark ', fakeUrl()) );
          }

        }
      }
    });


    function BookmarksCollection() {}

    /*
    var ClassDef = BookmarksCollection;
    ClassDef.prototype = collection; // extends
    ClassDef.prototype.constructor = BookmarksCollection;
    */

    var ClassDef = helpers.extendsFn( BookmarksCollection, collection );

    ClassDef.prototype.sayMyName = function() {
      return 'Angular.js : BookmarksCollection Mock';
    };

    var instance = new BookmarksCollection();

    console.log( instance );

    console.log( instance.list() );


    function Animal() {}
    Animal.prototype.def = function() { return 'Animal base'; };

    function Dog() {}
    var dogClassDef = helpers.extendsFn( Dog, Animal );
    dogClassDef.prototype.bark = function() { return 'au au'; };

    var dogInstance = new Dog();
    console.log( dogInstance );
    console.log( dogInstance.def() );
    console.log( dogInstance.bark() );

    return instance;

  }]);


});
