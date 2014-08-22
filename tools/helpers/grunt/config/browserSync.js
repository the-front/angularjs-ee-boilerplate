/*
  https://github.com/shakyShane/browser-sync/wiki/options

--------------------------------------------------------------------------------

  How do I fix the error EMFILE: Too many opened files?

    This is because of your system's max opened file limit.
    For OSX the default is very low (256).
    Temporarily increase your limit with `ulimit -n 10480`,
    the number being the new max limit.

    In some versions of OSX the above solution doesn't work.
    In that case try `launchctl limit maxfiles 10480 10480` and restart your terminal.

  https://github.com/gruntjs/grunt-contrib-watch#how-do-i-fix-the-error-emfile-too-many-opened-files

  https://superuser.com/questions/261023/how-to-change-default-ulimit-values-in-mac-os-x-10-6
*/

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
