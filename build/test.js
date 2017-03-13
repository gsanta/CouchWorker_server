var jasmine = require('gulp-jasmine'),
    JasmineSpecReporter = require('jasmine-spec-reporter').SpecReporter;

module.exports = function(gulp, config) {
    gulp.task('unit-test', ['ts-build'], function () {
        return gulp.src(config.distDir + '/**/*Spec.js')
            .pipe(jasmine({
                reporter: new JasmineSpecReporter({
                    displayStacktrace: 'all'
                })
            }));
    });

    gulp.task('test', ['unit-test'], function() {});
};
