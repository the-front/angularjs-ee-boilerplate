module.exports = {

  proxies: '<%= project.backend.proxies %>',

  middleware: function (connect, options) {
    var config = [
      // Serve static files.
      connect.static(options.base),
      // Make empty directories browsable.
      connect.directory(options.base)
    ];

    var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
    config.unshift(proxy);
    return config;
  },

  //---

  dev: {
    options: {
      port: '<%= project.frontend.port.connect %>',
      base: '<%= project.paths.src %>',
      hostname: '*',
      livereload: '<%= project.frontend.port.livereload %>',
      open: 'http://localhost:<%= project.frontend.port.connect %>'
    }
  },

  devProxy: {
    options: {
      port: '<%= project.frontend.port.connect %>',
      base: '<%= project.paths.src %>',
      hostname: '*',
      livereload: '<%= project.frontend.port.livereload %>',
      open: 'http://localhost:<%= project.frontend.port.connect %>',

      middleware: '<%= connect.middleware %>'
    }
  },

  //---

  dist: {
    options: {
      port: '<%= project.frontend.port.connect %>',
      base: '<%= project.paths.dist %>',
      hostname: '*',
      keepalive: true,
      open: 'http://localhost:<%= project.frontend.port.connect %>'
    }
  },

  distProxy: {
    options: {
      port: '<%= project.frontend.port.connect %>',
      base: '<%= project.paths.dist %>',
      hostname: '*',
      keepalive: true,
      open: 'http://localhost:<%= project.frontend.port.connect %>',

      middleware: '<%= connect.middleware %>'
    }
  }

};
