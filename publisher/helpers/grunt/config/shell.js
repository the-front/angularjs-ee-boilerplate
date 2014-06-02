// https://github.com/sindresorhus/grunt-shell
module.exports = {

  projectBuildDev: {
    command: 'grunt build:dev',
    options: {
      stdout: true,
      execOptions: {
        cwd: '<%= project.paths.project.tools %>'
      }
    }
  },

  projectBuildProd: {
    command: 'grunt build:prod',
    options: {
      stdout: true,
      execOptions: {
        cwd: '<%= project.paths.project.tools %>'
      }
    }
  },

  projectClean: {
    command: 'grunt clean',
    options: {
      stdout: true,
      execOptions: {
        cwd: '<%= project.paths.project.tools %>'
      }
    }
  }

};
