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

  dev: {
    options: {
      port: '<%= project.frontend.port.webserver %>',
      base: '<%= project.paths.build %>',
      hostname: '*',
      livereload: '<%= project.frontend.port.livereload %>',
      open: 'http://localhost:<%= project.frontend.port.webserver %>'
    }
  },

  devProxy: {
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
