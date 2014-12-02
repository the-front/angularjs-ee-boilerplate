// https://github.com/angular/protractor/blob/master/docs/referenceConf.js
exports.config = {

  // will use local selenium server jar
  // seleniumAddress: 'http://localhost:4444/wd/hub',

  // default web browser: Google Chrome
  /*
  capabilities: {
    'browserName': 'firefox'
  },
  */

  /*
  capabilities: {
    'browserName': 'internet explorer'
  },
  */

  /*
  multiCapabilities: [
    {
      'browserName': 'firefox'
    }, {
      'browserName': 'chrome'
    }, {
      'browserName': 'safari'
    }
  ],
  */

  /*
  multiCapabilities: [
    {
      'browserName': 'firefox'
    }, {
      'browserName': 'chrome'
    }, {
      'browserName': 'internet explorer'
    }
  ],
  */

  specs: [
    '../src/**/tests/e2e/*.spec.js'
  ],

  suites: {
    // page: ['../src/app/???/tests/e2e/*.spec.js'],
    // crud: ['../src/app/???/tests/e2e/*.spec.js'],
    bookmarks: ['../src/app/bookmarks/tests/e2e/*.spec.js']
  }

};
