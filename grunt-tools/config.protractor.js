// https://github.com/angular/protractor/blob/master/docs/referenceConf.js
exports.config = {

  // will use local selenium server jar
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  // seleniumAddress: 'http://selenium.host:4444/wd/hub',


  // default web browser: Google Chrome
  // capabilities: {
  //   // 'browserName': 'safari'
  //   // 'browserName': 'firefox'
  //   // 'browserName': 'internet explorer'
  // },


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

  framework: 'jasmine',

  // See the full list at https://github.com/juliemr/minijasminenode/tree/jasmine1
  jasmineNodeOpts: {
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000,
    // If true, print timestamps for failures
    showTiming: true,
    // Print failures in real time.
    realtimeFailure: false
  },

  specs: [
    '../src/**/tests/e2e/*.spec.js'
  ],

  suites: {
    // page: ['../src/app/???/tests/e2e/*.spec.js'],
    // crud: ['../src/app/???/tests/e2e/*.spec.js'],
    bookmarks: ['../src/app/bookmarks/tests/e2e/*.spec.js']
  }

};
