//////////////////////////////////////////////
///
///     mvvm
///     https://github.com/joelcoxokc/mvvm
///     2014, JoelCox
///
'use strict';

/////////////////////////////
///     Module Dependencies
var join  = require('path').join;

exports.runEnvironment = function(app) {

    //////
    //////     Require the file the has a name similar to the current NODE_ENV
    //////
    if (process.env.NODE_ENV === 'build') {
        return require('./stage.js')(app);
    }
    var path = join(__dirname, './', process.env.NODE_ENV) + '.js';
    return require(path)(app);

};