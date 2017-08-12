require('dotenv').config();
const nconf = require('nconf');

export interface Config {
    DATABASE_PORT: number;
}

function initConfig(): Config {
    nconf.env();

    nconf.defaults({
        DATABASE_PORT: 27017
    });

    return {
        DATABASE_PORT: nconf.get('DATABASE_PORT')
    };
}

export const config = initConfig();
