// Page object
module.exports = {

  get: function() {
    return browser.get('#/help');
  },

  pageName: element(by.binding('pageName')),

  githubUser: element(by.binding('githubUser'))

};
