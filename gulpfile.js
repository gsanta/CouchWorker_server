let gulp = require('gulp'),
    testModule = require('./build/test'),
    buildModule = require('./build/build');

let config = {
    distDir: './dist',
    contentBase: './test/harness'
}

testModule(gulp, config);
buildModule(gulp, config);
