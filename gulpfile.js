const gulp = require('gulp');
const testModule = require('./build/test/test_tasks');
const buildClientModule = require('./build/compile/build_client');
const buildServerModule = require('./build/compile/build_server');
const buildModule = require('./build/compile/build');

const config = {
    configDir: './build',
    distDir: './dist',
    clientDistDir: './dist/client',
    serverDistDir: './dist/server',
    contentBase: './test/harness'
}

testModule(gulp, config);
buildClientModule(gulp, config);
buildServerModule(gulp, config);
buildModule(gulp, config);