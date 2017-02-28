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
 
    // var tsProject = ts.createProject(config.tsConfig);
 
    // gulp.task('ts-build', function() {
    //     let compileSucceeded = true;
    //     let tsResult = tsProject.src()
    //         .pipe(tsProject())
    //         .on('error', () => { compileSucceeded = false; });
    //     return merge([
    //         tsResult.js.pipe(gulp.dest(config.distDir)),
    //         tsResult.dts.pipe(gulp.dest(config.distDir))
    //     ]).on('end', () => {
    //         if (!compileSucceeded) {
    //             throw new Error('Compilation failed.');
    //         }
    //     });
    // });

    gulp.task('watch-webpack', function(callback) {
        var createWebpackConfig = require('./webpack.dev.config.js');
 
        var webpackConfig = createWebpackConfig();
        webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8765');
 
        var compiler = webpack(webpackConfig);
        var watchOptions;
 
        new WebpackDevServer(compiler, {
            contentBase: config.demoSrc,
            watchOptions: watchOptions
        }).listen(8765, '0.0.0.0', function(err) {
            if(err) throw new gutil.PluginError('webpack-dev-server', err);
            gutil.log('[webpack-dev-server]', 'http://localhost:8765/');
        });
    }); 
};