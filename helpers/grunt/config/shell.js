// https://github.com/sindresorhus/grunt-shell
module.exports = {

  swtBuild: {
    command: 'grunt build:prod',
    options: {
      stdout: true,
      execOptions: {
        cwd: 'standalone_with_tools/tools'
      }
    }
  },

  swtClean: {
    command: 'grunt cleanup',
    options: {
      stdout: true,
      execOptions: {
        cwd: 'standalone_with_tools/tools'
      }
    }
  }

};