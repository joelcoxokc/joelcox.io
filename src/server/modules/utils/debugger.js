//////////////////////////////////////////////
///
///     mvvm
///     https://github.com/joelcoxokc/mvvm
///     2014, JoelCox
///
'use strict';

/////////////////////////////
///     Module Dependencies
var _    = require('lodash');
require('colors');

////////////////////////////
///     Expose the debugger module for access
///
///     @module        module
///     @dir           ./utils/debugger
///     @description
///
module.exports = function (msg, type) {

    switch (type) {
        case 'error':
            console.log();
            console.log(msg.bold.red);
            break;
        case 'warning':
            console.log();
            console.log(msg.bold.yellow);
            break;
        case 'info':
            console.log();
            console.log(msg.bold.cyan);
            break;
        case 'success':
            console.log();
            console.log(msg.bold.green);
            break;
        default:
            console.log();
            console.log(msg.bold);
            break;
    }
};
