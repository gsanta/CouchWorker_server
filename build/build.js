var gutil = require('gulp-util');
var ts = require('gulp-typescript');
var merge = require('merge2');
var exec = require('child_process').exec;
var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var argv = require('yargs').argv;
var fs = require('fs');
 
module.exports = function(gulp, config) {
    gutil.log('Configuring build tasks.');

    gulp.task('build-client', ['copy-html', 'build-webpack'], function() {});
    gulp.task('watch-client', ['watch-webpack'], function() {});

    gulp.task('build-webpack', function(callback) {
        var createWebpackConfig = require('./webpack.prod.config.js');

        webpack(createWebpackConfig(), function(err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
        });
    })

    gulp.task('copy-html', function() {
        gulp.src(config.contentBase + '/**/*')
        .pipe(gulp.dest(config.distDir + '/client'));
    });

    gulp.task('watch-webpack', function(callback) {
        var createWebpackConfig = require('./webpack.dev.config.js');
 
        var webpackConfig = createWebpackConfig();
        webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8765');
 
        var compiler = webpack(webpackConfig);
        var watchOptions;
 
        new WebpackDevServer(compiler, {
            contentBase: config.contentBase,
            watchOptions: watchOptions,
            historyApiFallback: true,
            proxy: {
                "/api/*": {
                    target: "http://localhost:3000"
                }
            }
        }).listen(8765, '0.0.0.0', function(err) {
            if(err) throw new gutil.PluginError('webpack-dev-server', err);
            gutil.log('[webpack-dev-server]', 'http://localhost:8765/');
        });
    });

    var tsProject = ts.createProject('./tsconfig.json');
 
    gulp.task('ts-build', function() {
        let compileSucceeded = true;
        let tsResult = tsProject.src()
            .pipe(tsProject())
            .on('error', () => { compileSucceeded = false; });
        return merge([
            tsResult.js.pipe(gulp.dest(config.distDir + '/ts')),
            tsResult.dts.pipe(gulp.dest(config.distDir + '/ts'))
        ]).on('end', () => {
            if (!compileSucceeded) {
                throw new Error('Compilation failed.');
            }
        });
    });
};