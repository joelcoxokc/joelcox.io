//////////////////////////////////////////////
///
///     mvvm
///     https://github.com/joelcoxokc/mvvm
///     2014, JoelCox
///
'use strict';

/////////////////////////////
///     Module Dependencies
var EventEmitter = require('events').EventEmitter,
    debug        = require('./debugger.js'),
    path         = require('path'),
    util         = require('util'),
    fs           = require('fs'),
    _            = require('lodash');

/////////////////////////////////
///     @Expose a new instance of the Utility Class
///     @class        Utility
///
exports = module.exports = new Utility;

/////////////////////////////////
///     @Expose Utility's constructor inorder to also allow inheritance from other modules
///     @constructor      Utility
///
exports.Utility = Utility;

/////////////////////////////////
///     @class Utility
///
function Utility() {

    var _this = this;
    this.debug = debug;


    //////
    //////     @Privledged   Methods
    //////

    //==============================
    //     one
    //     @param  {type}      param
    //     @return {type}
    //
    this.one = function (param) {};

    //==============================
    //     two
    //     @param  {type}      param
    //     @return {type}
    //
    this.two = function (param) {};

    //==============================
    //     three
    //     @param  {type}      param
    //     @return {type}
    //
    this.three = function (param) {};

};

/*///////////////////////////////////////////////////////
                                                     ///
@inherit the properties from node's event emitter    /*/
                                                     ///
Utility.prototype.__proto__ = EventEmitter.prototype;///
//===================================================///

///////////////////////////////////////////
//////     @Public    Methods
/////
////
///
//
//////////////////////////////////////////////
//     start
//     @return {type}
//
Utility.prototype.start = function (param) {};

///////////////////////////////////////////
//     log
//     @param  {type}      param
//     @return {type}
//
Utility.prototype.log = function (param) {};

////////////////////////////////////////////////
//     prompt
//     @param  {Array}      prompts
//     @param  {Function}
//     @return {type}
//
Utility.prototype.prompt = function (prompts, cb) {};



///////////////////////////////////////////
//////     @Private    Methods
/////
////
///
//
//////////////////////////////////
//     privatMethod
//     @param  {type}
//     @return {type}
//
function privateMethod (param) {}

////////////////////////////////////
//     someLongIterator
//     @param  {type}      param
//     @return {type}
//
function someLongIterator (param) {}



