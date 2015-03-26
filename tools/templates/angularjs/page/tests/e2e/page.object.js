// Page Object
module.exports = {

  get: function() {
    return browser.get('#/<%= route %>');
  },

  pageName: element(by.binding('vm.pageName'))

};
