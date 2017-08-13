const del = require('del');

module.exports = function(gulp, config) {
    gulp.task('clean', ['clean:server', 'clean:client'], function() {
        return del('dist');
    });
    gulp.task('ts-build', ['ts-build:client', 'ts-build:server']);
}