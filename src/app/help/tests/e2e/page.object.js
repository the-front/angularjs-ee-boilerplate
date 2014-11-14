// Page object
module.exports = {

  get: function() {
    return browser.get('#/help');
  },

  pageName: element(by.binding('vm.pageName')),

  githubUser: element(by.binding('vm.githubUser'))

};
