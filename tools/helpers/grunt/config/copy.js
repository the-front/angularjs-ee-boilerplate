module.exports = {

  // @begin: build tasks
  jstobuild: {
    files: [
      {
        expand: true,
        cwd: '<%= project.paths.src %>/',
        src: [
          '**/*.js', '!require.config.js'
        ],
        dest: '<%= project.paths.build %>/'
      }
    ]
  },

  todist: {
    files: [
      {
        expand: true,
        cwd: '<%= project.paths.src %>/',
        src: [
          '**', '!{,app/**/,shared/**/}*.js', '!**/*.{less,html}', '!styles/**/*.*'
        ],
        dest: '<%= project.paths.dist %>/'
      },
      {
        expand: true,
        cwd: '<%= project.paths.src %>/',
        src: [
          'shared/fallback/ie.js'
        ],
        dest: '<%= project.paths.dist %>/'
      },
      {
        expand: true,
        cwd: '<%= project.paths.src %>/',
        src: [
          'require.config.js'
        ],
        dest: '<%= project.paths.dist %>/'
      },
      {
        expand: true,
        cwd: '<%= project.paths.src %>/',
        src: [
          'index.html'
        ],
        dest: '<%= project.paths.dist %>/'
      }
    ]
  }
  // @end: build tasks

};
