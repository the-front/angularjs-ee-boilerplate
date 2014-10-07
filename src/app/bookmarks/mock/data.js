define(function(require) {
  'use strict';

  var module = require('shared/mock/module');

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
        hasOwnId: false, // save and use this 'id 'as '_id' inside collection?
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

          console.debug( 'init BookmarksCollection' );

          //var seq = 0;
          var seq = 20;

          function createObject(_id, _name, _description, _url) {
            return {
              // if id is string, save and use this 'id 'as '_id' inside collection
              id: 'num_' + _id,
              //id: _id,
              name: _name,
              description: _description,
              url: _url
            };
          }

          //---

          collection.insert( createObject(seq++, 'Twitter - Erko Bridee', '@ErkoBridee', 'https://twitter.com/erkobridee') );
          collection.insert( createObject(seq++, 'GitHub - Erko Bridee', 'github/erkobridee', 'https://github.com/erkobridee') );
          collection.insert( createObject(seq++, 'Delicious - Erko Bridee', 'delicious/erko.bridee', 'http://www.delicious.com/erko.bridee') );
          collection.insert( createObject(seq++, 'Site - Erko Bridee', 'Site : Erko Bridee', 'http://about.erkobridee.com/') );

          //---

          collection.insert(
            createObject(
              seq++,
              'Protractor',
              'end to end testing for AngularJS',
              'https://angular.github.io/protractor/'
            )
          );
          collection.insert(
            createObject(
              seq++,
              'Protractor Tutorial',
              'This is a simple tutorial that shows you how to set up Protractor and start running tests.',
              'https://angular.github.io/protractor/#/tutorial'
            )
          );
          collection.insert(
            createObject(
              seq++,
              'Protractor Source Code',
              '[GitHub] angular / protractor',
              'https://github.com/angular/protractor'
            )
          );

          //---

          function fakeUrl() {
            return 'http://google.com/#q=' + seq + '%2B' + seq;
          }

          for (var i = 142; i > 0; i--) {
            collection.insert( createObject(seq, 'fake bookmark ' + (seq+1), 'some description to fake bookmark ', fakeUrl()) );
            seq++;
          }

          //---

        }
      }
    });


    function BookmarksCollection() {}
    var ClassDef = helpers.extendsFn( BookmarksCollection, collection );

    ClassDef.prototype.sayMyName = function() {
      return 'Angular.js : BookmarksCollection Mock';
    };

    var instance = new BookmarksCollection();

    console.debug( instance.sayMyName() );
    console.debug( instance );
    console.debug( instance.list() );

    return instance;

  }]);

});
