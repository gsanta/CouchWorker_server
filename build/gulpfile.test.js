const jasmine = require('gulp-jasmine');
const JasmineSpecReporter = require('jasmine-spec-reporter').SpecReporter;
const es = require('event-stream');
const gutil = require('gutil');
const filesTestSetup = require('./setup/files.test.setup');

module.exports = function(gulp, config) {
    gulp.task('unit-test', ['ts-build'], function () {
        return es.concat(
                gulp.src(config.clientDistDir + '/**/*Spec.js'),
                gulp.src(config.serverDistDir + '/**/*Spec.js'),
                gulp.src(config.configDir + '/setup/jsdom.setup.js')
            )
            .pipe(jasmine({
                reporter: new JasmineSpecReporter({
                    displayStacktrace: 'all',
                    config: {
                        spec_files: [
                            '/**/*Spec.js'
                        ],
                        helpers: [
                            '/setup/jsdom.setup.js'
                        ]
                    }
                })
            }));
    });

    gulp.task('create-test-data', function() {
        try {
            initFiles();
        } catch(err) {
            gutil.log(err);
        }
    });

    gulp.task('test', ['unit-test'], function() {});
};
