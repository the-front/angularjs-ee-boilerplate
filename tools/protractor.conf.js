exports.config = {
  // will use local selenium server jar
  // seleniumAddress: 'http://localhost:4444/wd/hub',

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
  }

};
