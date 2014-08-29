module.exports = function(grunt) {

grunt.config('karma', {

  options: '<%= project.karma.options %>',

  specs: {
    reporters: ['progress']
  },

  coverage: {
    reporters: ['progress', 'coverage', 'html'],
    browsers: ['PhantomJS'],
    singleRun: true,
    logLevel: 'ERROR',
    coverageReporter: {
      type : 'html',
      dir : '<%= project.karma.reportsDir %>',
      subdir: 'coverage'
    },
    htmlReporter: {
      outputDir: '../<%= project.karma.reportsDir %>/__jasmine',
      templatePath: 'helpers/html_report_template/jasmine.html'
    }
  },

  unit: {
    reporters: ['html', 'progress', 'coverage'],
    browsers: ['PhantomJS'],
    coverageReporter: '<%= karma.coverage.coverageReporter %>',
    htmlReporter: '<%= karma.coverage.htmlReporter %>'
  },

  background: {
    reporters: '<%= karma.unit.reports %>',
    browsers: '<%= karma.unit.browsers %>',
    autoWatch: false,
    background: true,
    coverageReporter: '<%= karma.coverage.coverageReporter %>',
    htmlReporter: '<%= karma.coverage.htmlReporter %>'
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
