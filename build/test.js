var jasmine = require('gulp-jasmine'),
    JasmineSpecReporter = require('jasmine-spec-reporter').SpecReporter,
    es = require('event-stream');

module.exports = function(gulp, config) {
    gulp.task('unit-test', ['ts-build'], function () {
        return es.concat(
                gulp.src(config.clientDistDir + '/**/*Spec.js'),
                gulp.src(config.serverDistDir + '/**/*Spec.js'),
                gulp.src(config.configDir + '/**/jsdomSetup.js')
            )
            .pipe(jasmine({
                reporter: new JasmineSpecReporter({
                    displayStacktrace: 'all',
                    config: {
                        spec_files: [
                            '/**/*Spec.js'
                        ],
                        helpers: [
                            '/**/jsdomSetup.js'
                        ]
                    }
                })
            }));
    });

    gulp.task('test', ['unit-test'], function() {});
};
