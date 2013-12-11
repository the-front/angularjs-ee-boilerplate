module.exports = {

  dev: {
    options: {
      port: 1337,
      base: '<%= app.src %>',
      hostname: '*',
      livereload: true,
      open: 'http://localhost:<%= connect.dev.options.port %>'
    }     
  },
  
  dev_proxy: {
    options: {
      port: 1337,
      base: '<%= app.src %>',
      hostname: '*',
      livereload: true,
      open: 'http://localhost:<%= connect.dev_proxy.options.port %>/',

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
      }
    }      
  },

  proxies: '<%= app.dev_server.proxies %>'

};