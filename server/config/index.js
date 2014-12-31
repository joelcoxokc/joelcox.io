//////////////////////////////////////////////
///
///     mvvm
///     https://github.com/joelcoxokc/mvvm
///     2014, JoelCox
///
'use strict';

/////////////////////////////
///     Module Dependencies
var connectLivereload = require('connect-livereload'),
    methodOverride    = require('method-override'),
    environment       = require('./environment'),
    bodyParser        = require('body-parser'),
    express           = require('express'),
    morgan            = require('morgan'),
    path              = require('path'),
    _                 = require('lodash');

/////////////////////////////////
///     @Expose     conig module
///     @dir        ./config
///
module.exports      = function (app) {

      app.use(  bodyParser
        .urlencoded({extended:false}) );
      app.use(  connectLivereload()   );
      app.use(  bodyParser.json()     );
      app.use(  methodOverride()      );
      // app.use(  morgan('dev')         );

      // Root path of server
      //
      app.set('root', path.normalize(__dirname + '/../..') );

      // Server port
      //
      app.set('port', process.env.PORT || 9000);

      // Set environment Variables
      //
      environment.runEnvironment(app);

};
