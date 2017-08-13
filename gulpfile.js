const gulp = require('gulp');
const minimist = require('minimist');
const gulpfileTest = require('./build/gulpfile.test');
const gulpFileBuildClient = require('./build/gulpfile.build.clientrr');
const gulpFileBuildServer = require('./build/gulpfile.build.server');
const gulpfileBuild = require('./build/gulpfile.build');
const gulpfileHygiene = require('./build/gulpfile.hygiene.js')

var optionsDescriptor = {
    boolean: ['ci'],
    default: {
        ci: false
    }
};

var cmdLineArguments = minimist(process.argv.slice(2), optionsDescriptor);

const config = {
    configDir: './build',
    distDir: './dist',
    clientDistDir: './dist/client',
    serverDistDir: './dist/server',
    contentBase: './test/harness',
    reportDir: './dist/reports',
    cmdLineArguments: cmdLineArguments
}

gulpfileTest(gulp, config);
gulpFileBuildClient(gulp, config);
gulpFileBuildServer(gulp, config);
gulpfileBuild(gulp, config);
gulpfileHygiene(gulp, config);