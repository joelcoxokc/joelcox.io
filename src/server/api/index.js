//////////////////////////////////////////////
///
///     mvvm
///     https://github.com/joelcoxokc/mvvm
///     2014, JoelCox
///
'use strict';

/////////////////////////////
///     Module Dependencies
var Message  = require('./message');
var User  = require('./user');

//////////////////////////
///
///     @Expose Api Endpoints
///     @Module            Api
///
module.exports = function(app) {

    Message.router(app);
    User.router(app);

};
