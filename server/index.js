//////////////////////////////////////////////
///
///     mvvm
///     https://github.com/joelcoxokc/mvvm
///     2014, JoelCox
///
'use strict';

/////////////////////////////
///     Module Dependencies
var _       = require('lodash'),
    api     = require('./api'),
    config  = require('./config'),
    modules = require('./modules'),
    express = require('express');
//////////////////////////////
///
///     @NODE_ENV        development
///     @process.env     set node environment
///
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


///////////////////////////////
///     @app        Main Express Server
///     @export     app
///
var app = module.exports = express();

//////
//     @config initialize express app's configuration
//
config(app);

//////
//   @modules initialize custom modules
//
modules(app);

//////
//   @Api initialize Api Endpoints
//
api(app);

///////////////
//   Starte listening
app.listen(app.get('port'), function(){
  console.log('Express App Listening on ', app.get('port')) ;
})


