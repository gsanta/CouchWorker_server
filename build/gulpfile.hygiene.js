const tslint = require("gulp-tslint");
const tslintReporter = require('gulp-tslint-jenkins-reporter');

module.exports = function(gulp, config) {
    gulp.task('ts-lint', () => {
        let reporter = tslint.report({
            summarizeFailureOutput: true            
        });
 
        if (config.cmdLineArguments.ci) {
            reporter = tslintReporter({
                filename: config.reportDir + '/lint/ts-checkstyle.xml'
            });
        }

        return gulp.src("src/**/*.ts")
            .pipe(tslint({
                formatter: "stylish"
            }))
            .pipe(reporter);
    });
}