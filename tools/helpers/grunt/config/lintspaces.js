module.exports = {

  all: {
    src: [
      '<%= project.paths.src %>/*.{html,css,js,coffee}',
      '<%= project.paths.src %>/{app/,shared/}**/*.{html,css,js,coffee,less}',
      '<%= project.paths.src %>/styles/less/*.less',
      '<%= project.paths.src %>/helpers/**/*.js'
    ],
    options: {
      editorconfig: '<%= project.paths.editorconfig %>'
    }
  }

};
