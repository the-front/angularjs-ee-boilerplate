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
      port: '<%= project.frontend.port %>',
      base: '<%= project.paths.src %>',
      hostname: '*',
      livereload: true,
      open: 'http://localhost:<%= project.frontend.port %>'
    }
  },
  
  devProxy: {
    options: {
      port: '<%= project.frontend.port %>',
      base: '<%= project.paths.src %>',
      hostname: '*',
      livereload: true,
      open: 'http://localhost:<%= project.frontend.port %>',

      middleware: '<%= connect.middleware %>'
    }
  },

  //---

  dist: {
    options: {
      port: '<%= project.frontend.port %>',
      base: '<%= project.paths.dist %>',
      hostname: '*',
      keepalive: true,
      open: 'http://localhost:<%= project.frontend.port %>'
    }
  },
  
  distProxy: {
    options: {
      port: '<%= project.frontend.port %>',
      base: '<%= project.paths.dist %>',
      hostname: '*',
      keepalive: true,
      open: 'http://localhost:<%= project.frontend.port %>',
      
      middleware: '<%= connect.middleware %>'
    }
  }

};