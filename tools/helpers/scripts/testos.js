var async_exec = require('child_process').exec;

// http://documentup.com/arturadib/shelljs
async_exec('npm install shelljs', function (err, stdout, stderr) {
  require('shelljs/global');

  echo('Testing OS environment');

  var os = require('../lib/oscheck');

  /*
    What platform you're running on: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
    win32 (for 32 or 64 bit)
  */
  echo('OS detected is: '+os.name);
  echo('isWin = '+os.isWin);
  echo('isLinux = '+os.isLinux);
  echo('isMac = '+os.isMac);
  echo('\n');

});
