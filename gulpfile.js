const gulp = require('gulp');
const testModule = require('./build/test');
const buildClientModule = require('./build/build_client');
const buildServerModule = require('./build/build_server');
const buildModule = require('./build/build');

const config = {
    configDir: './build',
    clientDistDir: './client',
    serverDistDir: './server',
    contentBase: './test/harness'
}

testModule(gulp, config);
buildClientModule(gulp, config);
buildServerModule(gulp, config);
buildModule(gulp, config);