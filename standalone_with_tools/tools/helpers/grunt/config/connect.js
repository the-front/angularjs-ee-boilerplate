module.exports = {

  dev: {
    options: {
      port: 1337,
      base: '<%= project.paths.src %>',
      hostname: '*',
      open: 'http://localhost:<%= connect.dev.options.port %>',
      keepalive: true
    }      
  },

  dist: {
    options: {
      port: 1337,
      base: '<%= project.paths.dist %>',
      hostname: '*',
      open: 'http://localhost:<%= connect.dist.options.port %>',
      keepalive: true
    }      
  }

};