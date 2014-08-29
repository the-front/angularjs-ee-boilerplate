module.exports = function(grunt) {

grunt.config('karma', {

  options: '<%= project.karma.options %>',

  specs: {
    reporters: ['html', 'progress']
  },

  coverage: {
    reporters: ['progress', 'coverage'],
    browsers: ['PhantomJS'],
    singleRun: true,
    logLevel: 'ERROR',
    coverageReporter: {
      type : 'html',
      dir : '<%= project.karma.reportsDir %>/coverage/',
      subdir: 'html'
    }
  },

  unit: {
    reporters: ['html', 'progress', 'coverage'],
    browsers: ['Chrome'],
    coverageReporter: '<%= karma.coverage.coverageReporter %>'
  },

  background: {
    reporters: '<%= karma.unit.reports %>',
    browsers: '<%= karma.unit.browsers %>',
    autoWatch: false,
    background: true,
    coverageReporter: '<%= karma.coverage.coverageReporter %>'
  },

  ci: {
    reporters: ['junit', 'coverage'],
    browsers: ['PhantomJS'],
    singleRun: true,
    logLevel: 'ERROR',
    junitReporter: {
      outputFile: '<%= project.karma.reportsDir %>/junit/test-results.xml'
    },
    coverageReporter: {
      type : 'lcovonly', // produces an lcov.info file
      dir : '<%= project.karma.reportsDir %>/coverage/',
      subdir: '.'
    }
  }

});

};
