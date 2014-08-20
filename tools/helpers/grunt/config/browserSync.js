// https://github.com/shakyShane/browser-sync/wiki/options

module.exports = function(grunt) {

grunt.config('browserSync', {

  dev: {

    bsFiles: {
      src: [
        '<%= project.paths.build %>/styles/*.css',
        '<%= project.paths.build %>/{,app/**/,shared/**/}*.{html,js}'
      ]
    },

    options: {

      port: '<%= project.frontend.port.webserver %>',

      server: {
        baseDir: '<%= project.paths.build %>',
      },

      watchTask: true
    }

  },

  devProxy: {

    bsFiles: {
      src: [
        '<%= project.paths.build %>/styles/*.css',
        '<%= project.paths.build %>/{,app/**/,shared/**/}*.{html,js}'
      ]
    },

    options: {

      port: '<%= project.frontend.port.webserver %>',

      server: {
        baseDir: '<%= project.paths.build %>',
        middleware: [
          require('grunt-connect-proxy/lib/utils').proxyRequest
        ]
      },

      watchTask: true
    }

  },

  //---

  dist: {

    options: {

      port: '<%= project.frontend.port.webserver %>',

      server: {
        baseDir: '<%= project.paths.dist %>',
      }

    }

  },

  distProxy: {

    options: {

      port: '<%= project.frontend.port.webserver %>',

      server: {
        baseDir: '<%= project.paths.dist %>',
        middleware: [
          require('grunt-connect-proxy/lib/utils').proxyRequest
        ]
      }

    }

  },


});

};
