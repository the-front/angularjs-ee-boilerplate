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

  // @begin: karma reports server
  reports: {
    options: {
      port: '<%= project.reports.port.webserver %>',
      base: '<%= project.paths.reports %>',
      hostname: '*',
      livereload: '<%= project.reports.port.livereload %>'
    }
  },
  // @end: karma reports server

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
  },

  //---

  e2e: { // with proxy support
    options: {
      port: '<%= project.frontend.port.webserver %>',
      base: '<%= project.paths.dist %>',
      hostname: '*',
      keepalive: false,
      open: 'http://localhost:<%= project.frontend.port.webserver %>',

      middleware: '<%= connect.middleware %>'
    }
  }

});

};
