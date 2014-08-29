module.exports = function(grunt) {

grunt.config('connect', {

  proxies: '<%= project.backend.proxies %>',

  middleware: function (connect, options) {
    if (!Array.isArray(options.base)) {
        options.base = [options.base];
    }

    // Setup the proxy
    var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

    options.base.forEach(function(base) {
      // Serve static files.
      middlewares.push(connect.static(base));
      // Make directory browse-able.
      middlewares.push(connect.directory(base));
    });

    return middlewares;
  },

  //---

  reports: {
    options: {
      port: '<%= project.reports.port.webserver %>',
      base: '<%= project.paths.reports %>',
      hostname: '*',
      livereload: '<%= project.reports.port.livereload %>'
    }
  },

  // @begin: coverage report server

  coverage: {
    options: {
      port: '<%= project.coverage.port.webserver %>',
      base: '<%= project.paths.reports %>/coverage/html',
      hostname: '*',
      livereload: '<%= project.coverage.port.livereload %>',
      open: 'http://localhost:<%= project.coverage.port.webserver %>'
    }
  },

  // @end: coverage report server
  //---

  livereload: {
    options: {
      port: '<%= project.frontend.port.webserver %>',
      base: '<%= project.paths.build %>',
      hostname: '*',
      livereload: '<%= project.frontend.port.livereload %>',
      open: 'http://localhost:<%= project.frontend.port.webserver %>'
    }
  },

  livereloadProxy: {
    options: {
      port: '<%= project.frontend.port.webserver %>',
      base: '<%= project.paths.build %>',
      hostname: '*',
      livereload: '<%= project.frontend.port.livereload %>',
      open: 'http://localhost:<%= project.frontend.port.webserver %>',

      middleware: '<%= connect.middleware %>'
    }
  },

  //---

  dist: {
    options: {
      port: '<%= project.frontend.port.webserver %>',
      base: '<%= project.paths.dist %>',
      hostname: '*',
      keepalive: true,
      open: 'http://localhost:<%= project.frontend.port.webserver %>'
    }
  },

  distProxy: {
    options: {
      port: '<%= project.frontend.port.webserver %>',
      base: '<%= project.paths.dist %>',
      hostname: '*',
      keepalive: true,
      open: 'http://localhost:<%= project.frontend.port.webserver %>',

      middleware: '<%= connect.middleware %>'
    }
  }

});

};
