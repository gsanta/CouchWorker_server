const ts = require('gulp-typescript');
const merge = require('merge2');
const del = require('del');

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
          return del('server');
    });
};