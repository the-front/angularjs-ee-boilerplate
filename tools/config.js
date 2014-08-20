module.exports = function() {

  return {

    paths: {
      src: '../src',
      build: '.temp',
      dist: '../dist',
      templates: 'templates',
      editorconfig: '../.editorconfig'
    },

    frontend: {
      webserver: 1337,
      livereload: 9337 // default: 35729
    },

    // config proxy to application backend
    backend: {
      host: 'localhost',
      port: 9000,
      context: 'rest'
    }

  };

};
