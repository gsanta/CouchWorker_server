let gulp = require('gulp'),
    testModule = require('./build/test'),
    buildModule = require('./build/build');

let config = {
    distDir: './dist'
}

testModule(gulp, config);
buildModule(gulp, config);
