module.exports = function(grunt) {

grunt.config('open', {

  coverage: {
    path: '<%= project.paths.reports %>/coverage/html/index.html'
  },

  reports: {
    path: '<%= project.paths.reports %>'
  },

  karma_report_coverage: {
    path: 'http://localhost:<%= project.reports.port.webserver %>/coverage'
  },

  karma_report_jasmine: {
    path: 'http://localhost:<%= project.reports.port.webserver %>/jasmine'
  }

});

};
