//////////////////////////////////////////////
///
///     mvvm
///     https://github.com/joelcoxokc/mvvm
///     2014, JoelCox
///
'use strict';
/////////////////////////////
///     Module Dependencies
var express = require('express'),
    path    = require('path');

var configuation = {

    DATABASE_URI:      '',

    someAPI: {
        API_ID:        '',
        API_KEY:       '',
        API_TOKEN:     '',
        API_SECRET:    '',
        API_CALLBACK:  '',
    },

    anotherAPI: {
        API_ID:        '',
        API_KEY:       '',
        API_TOKEN:     '',
        API_SECRET:    '',
        API_CALLBACK:  '',
    }
};
/////////////////////////////////
///     @Environment Configuation
///     @NODE_ENV        development
///
module.exports = function(app) {

    app.set('env',     'development');
    app.set('config',  configuation);
    app.set('tmpPath', rootDir('.tmp'));
    app.set('appPath', rootDir('src/client'));

    console.log('** DEV **');
    console.log('serving from ' + './src/client/ and ./');
    app.use('/', express.static('./src/client/'));
    app.use('/', express.static('./.tmp/'));
    app.use('/', express.static('./'));

    function rootDir(arg) {
        return path.join(app.get('root'), arg);
    }

};