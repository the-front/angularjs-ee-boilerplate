var async_exec = require('child_process').exec;

// http://documentup.com/arturadib/shelljs
async_exec('npm install shelljs', function (err, stdout, stderr) {
  require('shelljs/global');

  var oscheck = require('../lib/oscheck');

  var sudoStr =  (oscheck.isLinux || oscheck.isMac) ? 'sudo ' : '';
  var cmd = '';

  echo('About to setup environment');
  echo('It works if it finishes with OK');

  echo('----------------------------------------');

  echo('Installing gulp...\n');
  exec('npm install gulp');

  echo('----------------------------------------');

  echo('Installing node dependencies...\n');
  exec('npm install');

  echo('\nOK!');
});
