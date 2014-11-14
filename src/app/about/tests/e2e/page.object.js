// Page object
module.exports = {

  get: function() {
    return browser.get('#/about');
  },

  pageName: element(by.binding('vm.pageName'))

};
