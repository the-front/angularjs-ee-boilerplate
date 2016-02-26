var _ = require('lodash'),
    options = require('./karma.options');

var coverageReporterHtml = {
  type : 'html',
  dir : 'tests_out/coverage/',
  subdir: 'html'
};

var baseUnitConfig = {
  reporters: ['progress', 'coverage', 'html'],
  browsers: ['PhantomJS'],
  coverageReporter: coverageReporterHtml
};

module.exports = {

  unitSingleRun: _.extend({}, options, baseUnitConfig, {
    singleRun: true
  }),

  unit: _.extend({}, options, baseUnitConfig, {
    singleRun: false
  }),

  specs: _.extend({}, options, {
    reporters: ['progress', 'html'],
    browsers: ['Chrome']
  }),

  coverage: _.extend({}, options, {
    reporters: ['coverage'],
    browsers: ['PhantomJS'],
    singleRun: true,
    colors: false,
    logLevel: 'ERROR',
    coverageReporter: coverageReporterHtml
  }),

  ci: _.extend({}, options, {
    reporters: ['junit', 'coverage'],
    browsers: ['PhantomJS'],
    singleRun: true,
    colors: false,
    logLevel: 'ERROR',
    junitReporter: {
      outputDir: 'tests_out/junit'
    },
    coverageReporter: {
      type : 'lcovonly', // produces an lcov.info file
      dir : 'tests_out/coverage/',
      subdir: '.'
    }
  })

};
