let gulp = require('gulp'),
    testModule = require('./build/test');

let config = {
    distDir: './dist'
}

testModule(gulp, config);
