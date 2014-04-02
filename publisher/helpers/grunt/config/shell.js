// https://github.com/sindresorhus/grunt-shell
module.exports = {

  projectBuild: {
    command: 'grunt build:prod',
    options: {
      stdout: true,
      execOptions: {
        cwd: '<%= project.paths.project.tools %>'
      }
    }
  },

  projectClean: {
    command: 'grunt cleanup',
    options: {
      stdout: true,
      execOptions: {
        cwd: '<%= project.paths.project.tools %>'
      }
    }
  }

};
