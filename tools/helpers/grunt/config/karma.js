module.exports = function(grunt) {

grunt.config('karma', {

  options: '<%= project.karma.options %>',

  specs: {
    reporters: ['html', 'progress']
  },

  coverage: {
    reporters: ['coverage'],
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
