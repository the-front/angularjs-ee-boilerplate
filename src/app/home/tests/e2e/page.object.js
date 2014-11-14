// Page Object
module.exports = {

  get: function() {
    return browser.get('#/');
  },

  pageName: element(by.binding('vm.pageName'))

};
