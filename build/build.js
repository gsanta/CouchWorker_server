

module.exports = function(gulp, config) {
    gulp.task('clean', ['clean:server', 'clean:client']);
    gulp.task('ts-build', ['ts-build:client', 'ts-build:server']);
}