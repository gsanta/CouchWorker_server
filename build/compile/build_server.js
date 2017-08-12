const ts = require('gulp-typescript');
const merge = require('merge2');
const del = require('del');
var exec = require('child_process').exec;

module.exports = function(gulp, config) {
    const tsProject = ts.createProject('./tsconfig_server.json');
 
    gulp.task('ts-build:server', function() {
        let compileSucceeded = true;
        let tsResult = tsProject.src()
            .pipe(tsProject())
            .on('error', () => { compileSucceeded = false; });
        return merge([
            tsResult.js.pipe(gulp.dest(config.serverDistDir + '/js')),
            tsResult.dts.pipe(gulp.dest(config.serverDistDir + '/js'))
        ]).on('end', () => {
            if (!compileSucceeded) {
                throw new Error('Compilation failed.');
            }
        });
    });

    gulp.task('clean:server', function() {
          return del(config.serverDistDir);
    });

    gulp.task('watch:server', ['ts-build:server'], function() {
        gulp.watch('src/server/**/*.ts', ['ts-build:server']);
        gulp.watch('src/shared/**/*.ts', ['ts-build:server']);

        exec('nodemon dist/server/js/server/index.js', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    });
};