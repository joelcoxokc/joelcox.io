//////////////////////////////////////////////
///
///     mvvm
///     https://github.com/joelcoxokc/mvvm
///     2014, JoelCox
///
'use strict';

/////////////////////////////
///     Module Dependencies
var _    = require('lodash'),
    bogan = require('boganipsum'); // Used for generating random text

////////////////////////
//
//  @wxpose Message API
//
module.exports = new Message


function Message(app) {
    this.messages = GenerateRandomMessages();

    this.idCount = 10;

    this.increment = function(){
      this.idCount++
      return this.idCount;
    };
};

////////////////////////////////////
//
//  @index
//  @param      param
//  @param      cb
Message.prototype.index   = function (cb) {
  cb(null, this.messages)
};

////////////////////////////////////
//
//  @show
//  @param      param
//  @param      cb
Message.prototype.show    = function (param, cb) {
  var message =    _(this.messages).find({id:param})
  if(message){
    cb(null, message);
  } else {
    cb('Message Cannot be found', null);
  }
};

////////////////////////////////////
//
//  @create
//  @param      param
//  @param      cb
Message.prototype.create  = function (message, cb) {
  message.id = this.increment();
  this.messages.push(message);
  cb(null, message);
};

////////////////////////////////////
//
//  @update
//  @param      param
//  @param      cb
Message.prototype.update  = function (message, cb) {};

////////////////////////////////////
//
//  @destroy
//  @param      param
//  @param      cb
Message.prototype.destroy = function (param, cb) {};


// Simply generates random messages
function GenerateRandomMessages(){
  return _.map(_.range(10), function (val){
    return {
      id: val,
      title: bogan({ paragraphs: 1 }).split(' ')[0],
      text:  bogan({ paragraphs: 1 })
    }
  })
}