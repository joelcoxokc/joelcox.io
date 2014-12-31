///
///     mvvm
///     https://github.com/joelcoxokc/mvvm
///     2014, JoelCox
///
'use strict';

/////////////////////////////
///     Module Dependencies
var Message    = require('./message.model'),
    _          = require('lodash');


exports.index   = function (req, res) {
  Message.index(function (err,result){
    if(err) res.send(404);
    res.send(result);
  })
};
exports.create  = function (req, res) {};
exports.show    = function (req, res) {};
exports.update  = function (req, res) {};
exports.destroy = function (req, res) {};