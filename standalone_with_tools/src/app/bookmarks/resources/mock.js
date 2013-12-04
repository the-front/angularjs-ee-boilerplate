angular.mock.backend.addResource(function(DataStore, $httpBackend, regexpUrl, getParams) {
  'use strict';

  console.log(DataStore);

  var seq = 0;
  var bookmarks = DataStore.addCollection('bookmarks', 'Bookmark', ['id', 'name']);

  console.log('TODO: define app/bookmarks mock');

  //--- URL intercept

  // TODO: define

  //--- fake database

  function getById(id) {
    var r = bookmarks.find({'id': id});
    if(r.length > 0) return r[0]; 
    return null;
  }

  function update(bookmark) {
    if('object' == typeof bookmarks) 
      return bookmarks.update(bookmark);
  }

  function search(find) {
    if(!find) return [];

    var r = [], obj,
        regexp = new RegExp(find, 'i'),
        data = bookmarks.find(),
        len = data.length;

    for (var i = 0; i < len; i++) {
      obj = data[i];

      if(obj.name.match(regexp) || obj.description.match(regexp))
        r.push(obj);
    }

    return r;
  }

  function paginate(data, options) {
    
    var result = {
      data: [],
      count: 0,
      page: 1,
      pages: 1
    };

    //---

    var page = [];
    var i, count, length, limit, flag;

    if(options.page <= 0) options.page = 1;

    count = 0;
    length = data.length;
    i = ((options.page-1) * options.size);
    limit = options.size;

    if(i < length) {
      flag = true;
    } else {
      flag = false;
    }

    while(flag) {

      page.push(data[i]);

      i++; count++;

      if(i<length && count<limit) {
        flag = true;
      } else {
        flag = false;
      }
    }
    
    result.count = length;
    result.data = page;
    result.page = options.page;
    result.pages = Math.ceil(length / options.size);    

    return result;
  }

    //--- fake data ---

  function createBookmark(_id, _name, _description, _url) {
    return {
      id: _id,
      name: _name,
      description: _description,
      url: _url
    };
  }

  bookmarks.insert(createBookmark(seq++, 'Twitter - Erko Bridee', '@ErkoBridee', 'https://twitter.com/erkobridee'));
  bookmarks.insert(createBookmark(seq++, 'GitHub - Erko Bridee', 'github/erkobridee', 'https://github.com/erkobridee'));
  bookmarks.insert(createBookmark(seq++, 'Delicious - Erko Bridee', 'delicious/erko.bridee', 'http://www.delicious.com/erko.bridee'));
  bookmarks.insert(createBookmark(seq++, 'Site - Erko Bridee', 'Site : Erko Bridee', 'http://about.erkobridee.com/'));

  (function() {
    function fakeUrl() {
      return 'http://google.com/#q=' + seq + '%2B' + seq;
    }

    for (var i = 59; i >= 0; i--) {
      bookmarks.insert(createBookmark(seq++, 'fake bookmark ' + (seq+1), 'some description to fake bookmark ', fakeUrl()));      
    }
  })();

  console.log(getById(1));
  console.log(bookmarks.find());
  console.log(search('erko'));
  console.log(paginate(bookmarks.find(), {page: 1, size: 10}));

});