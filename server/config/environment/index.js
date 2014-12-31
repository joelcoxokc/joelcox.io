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

exports.runEnvironment = function(app){

  //////
  //////     Require the file the has a name similar to the current NODE_ENV
  //////
  return require( './'+process.env.NODE_ENV +'.js' )(app)

};