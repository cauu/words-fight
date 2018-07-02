'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var zip = require('gulp-zip');
var Ftp = require('ftp');
var ExecSync = require('child_process').execSync;
var spawn = require('child_process').spawn;
var Path = require('path');
var fs = require('fs-extra');

gulp.task('make-cocos2d-x', gulpSequence('gen-cocos2d-x', 'upload-cocos2d-x'));
gulp.task('make-prebuilt', gulpSequence('gen-libs', 'collect-prebuilt-mk', 'archive-prebuilt-mk', 'archive-prebuilt', 'upload-prebuilt', 'upload-prebuilt-mk'));
gulp.task('make-simulator', gulpSequence('update-simulator-config', 'update-simulator-dll', 'archive-simulator', 'upload-simulator'));

function execSync(cmd, workPath) {
  var execOptions = {
    cwd : workPath,
    stdio : 'inherit'
  };
  ExecSync(cmd, execOptions);
}

function downloadSimulatorDLL(callback) {
    var Download = require('download');
    var destPath = Path.join('simulator', 'win32');
    new Download({
        mode: '755',
        extract: true,
        strip: 0
    })
        .get('http://192.168.52.109/TestBuilds/Fireball/simulator/dlls/dll.zip')
        .dest(destPath)
        .run(function(err, files) {
            if (err) throw err;
            else callback();
        });
}

function upload2Ftp(localPath, ftpPath, config, cb) {
  var ftpClient = new Ftp();
  ftpClient.on('error', function(err) {
    if (err) {
      cb(err);
    }
  });
  ftpClient.on('ready', function() {
    var dirName = Path.dirname(ftpPath);
    ftpClient.mkdir(dirName, true, function(err) {
      if (err) {
        cb(err);
      }
    });

    ftpClient.put(localPath, ftpPath, function(err) {
      if (err) {
        cb(err);
      }
      ftpClient.end();
      cb();
    });
  });

  // connect to ftp
  ftpClient.connect(config);
}

function uploadZipFile (zipFileName, path, cb) {
  var branch = getCurrentBranch();
  if (branch === 'develop') {
    branch = 'dev';
  }
  var remotePath = Path.join('TestBuilds','Fireball', 'cocos2d-x', branch, zipFileName);
  var zipFilePath = Path.join(path, zipFileName);
  upload2Ftp(zipFilePath, remotePath, {
    host: '192.168.52.109',
    user: process.env.ftpUser,
    password: process.env.ftpPass
  },function(err) {
    if (err) {
      throw err;
    }
    cb();
  });
}

function getCurrentBranch() {
    var spawnSync = require('child_process').spawnSync;
    var output = spawnSync('git', ['symbolic-ref', '--short', '-q', 'HEAD']);
    // console.log(output);
    return output.stdout.toString().trim();
}

gulp.task('init', function(cb) {
  execSync('python download-deps.py', '.');
  execSync('git submodule update --init', '.');
  cb();
});

gulp.task('gen-libs', function(cb) {
  var cocosConsoleRoot = './tools/cocos2d-console/bin';
  var cocosConsoleBin;
  if (process.platform === 'darwin') {
    cocosConsoleBin = Path.join(cocosConsoleRoot, 'cocos');
  }
  else {
    cocosConsoleBin = Path.join(cocosConsoleRoot, 'cocos.bat');
  }
  execSync(cocosConsoleBin + ' gen-libs -m release', '.');
  cb();
});

gulp.task('gen-cocos2d-x', function (cb) {
  execSync('./git-archive-all cocos2d-x.zip', './tools/make-package');
  cb();
});

gulp.task('gen-simulator', function (cb) {
  var cocosConsoleRoot = './tools/cocos2d-console/bin';
  var cocosConsoleBin;
  if (process.platform === 'darwin') {
    cocosConsoleBin = Path.join(cocosConsoleRoot, 'cocos');
  }
  else {
    cocosConsoleBin = Path.join(cocosConsoleRoot, 'cocos.bat');
  }
  var args;
  if (process.platform === 'darwin') {
    args = ['gen-simulator', '-m', 'debug', '-p', 'mac'];
  }
  else {
    args = ['gen-simulator', '-m', 'debug', '-p', 'win32', '--vs', '2013', '--ol', 'en'];
  }
  try {
    var child = spawn(cocosConsoleBin, args);
    child.stdout.on('data', function (data) {
      console.log(data.toString());
    });
    child.stderr.on('data', function (data) {
      console.error(data.toString());
    });
    child.on('close', (code) => {
      if (code !== 0) {
        console.error('Generate simulator failed');
        cb();
        return;
      }
    });
    child.on('error', function () {
      console.error('Generate simulator failed');
      cb();
    });
  }
  catch (err) {
    console.error(err);
    cb();
    return;
  }
});

gulp.task('collect-prebuilt-mk', function () {
  fs.removeSync('./prebuilt_mk');
  return gulp.src([
    '**/prebuilt-mk/Android.mk',
    ], {
    base: './'
  }).pipe(gulp.dest('prebuilt_mk'));
});

gulp.task('update-simulator-config', ['update-simulator-script'], function (cb) {
  var destPath = process.platform === 'win32' ? './simulator/win32/config.json' : './simulator/mac/Simulator.app/Contents/Resources/config.json';
  fs.copy('./tools/simulator/config.json', destPath, cb);
});

gulp.task('update-simulator-dll', function (cb) {
  if (process.platform === 'win32') {
    downloadSimulatorDLL(cb);
  } else {
    cb();
  }
});

gulp.task('update-simulator-script', function (cb) {
    var simulatorPath =  process.platform === 'win32' ? './simulator/win32' : './simulator/mac/Simulator.app/Contents/Resources';
    var destPath = simulatorPath + '/script';
    var updateScript = function (callback) {
      fs.copy('./cocos/scripting/js-bindings/script', destPath, {
        clobber: true,
        filter: function(name) {
          if (name.startsWith('.DS_Store')) {
            return false;
          } else {
            return true;
          }
        }
      }, callback);
    };

    if (!fs.existsSync(simulatorPath)) {
        console.error(`Cant\'t find simulator dir [${simulatorPath}]`);
    } else {
      updateScript(cb);
    }
});

gulp.task('archive-prebuilt-mk', function () {
  return gulp.src('./prebuilt_mk/**/*')
    .pipe(zip('prebuilt_mk_' + process.platform + '.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('archive-simulator', function () {
  return gulp.src('./simulator/**/*')
    .pipe(zip('simulator_' + process.platform + '.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('archive-prebuilt', function () {
  return gulp.src('./prebuilt/**/*', {
    base: './'
  }).pipe(zip('prebuilt_' + process.platform + '.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('upload-prebuilt-mk', function (cb) {
  var zipFileName = 'prebuilt_mk_' + process.platform + '.zip';
  uploadZipFile(zipFileName, '.', cb);
});

gulp.task('upload-prebuilt', function (cb) {
  var zipFileName = 'prebuilt_' + process.platform + '.zip';
  uploadZipFile(zipFileName, '.', cb);
});

gulp.task('upload-cocos2d-x', function (cb) {
  var zipFileName = 'cocos2d-x.zip';
  uploadZipFile(zipFileName, './tools/make-package', cb);
});

gulp.task('upload-simulator', function (cb) {
  var zipFileName = 'simulator_' + process.platform + '.zip';
  uploadZipFile(zipFileName, '.', cb);
});