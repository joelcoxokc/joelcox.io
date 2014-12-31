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
    express = require('express'),
    controller = require('./message.controller');

////////////////////////////
///
///     @Expose Message Api
///     @Api            Message
///
var Message = module.exports


Message.router = function (app) {
  //////
  ///     @router    new express.router instance
  //////
  var router = express.Router();

  // @method GET
  // @url    /messages
  router.get('/',         controller.index);

  // @method GET
  // @url    /messages/:id
  router.get('/:id',      controller.show);

  // @method POST
  // @url    /messages
  router.post('/',        controller.create);

  // @method PUT
  // @url    /messages/:id
  router.put('/:id',      controller.update);

  // @method DELETE
  // @url    /messages/:id
  router.delete('/:id',   controller.destroy);

  //////
  ///     @app    Tell the express app to use this router for any routes prepended with /api/messages
  //////
  app.use( '/api/messages', router );

};