;(function(){
'use strict';
  angular
    .module('core')
    .service('$storage', $Storage)

  window.$local = window.localStorage;

  var util = new Utility;

  ///////////////////
  // @Class Utility
  // Class for simple utility tools for checking whether the json inout and out put it a string or object
  //
  function Utility () {}

  ///////////////// @toJson
  ///
  // Validate whether the input is an Object or string.
  // @input  {String|Object|Array}
  //
  // @return {String} if input is a string
  // @return {JSON}   if input is Object or array
  Utility.prototype.toJson = function (input) {
      // console.log('input', input, angular.isObject(input));
      return angular.isObject(input) ? angular.toJson(input) : input;
  };

  ///////////////// @toJson
  //
  // Validate whether the required output should be parsed or not
  // @output String or JSON
  // @return {String}         if @output is a string
  // @return {Object|Array}   if @output is an Object or array
  Utility.prototype.fromJson = function (output) {

    return /\s*([\[+\{+])\s*/.test(output) ? angular.fromJson(output) : output
  };


  ///////////////// Storage
  //
  // @use Web Storage API
  // @Storage.prototype is the built in prototype for both localStorage and sessionStorage
  //                    adding methods to @Storage.prototype will add them to both
  // @localStorage
  // @sessionStorage

  ///////////////// get
  //
  //  @use get to retrive objects from Web Storage via the key property
  //  @key    {String}   Identifier for the requested value from web storage
  //  @return {String|Object|Array}
  Storage.prototype.get = function (key) {
    return util.fromJson( $local.getItem(key) )
  };

  ///////////////// set
  //
  // @use set to set {key:value} properties in web storage
  // @key    {String}                key identifier in web storage
  // @value  {String|Object|Array}   value to store @key in web storage
  // @return {JSON}                  return the stored Json Object
  Storage.prototype.set = function (key, val) {

    return $local.setItem(key, util.toJson(val) )
  };

  ///////////// Item
  //
  // @Class Item We will use new Item when we retrieve values from web storage
  // This will add a few private methods to the retreived objects
  // @key {String}  The key at which the item is stored in web storage
  //
  // @usage If we want an Item from web storage we do the following
  //       var item = new Item('things');
  // @not
  //       vat item = localStorage.getItem('things');
  function Item (key) {
    _.extend(this, $local.get(key))

    Object.defineProperty(this, 'storeId', {
      value:key,
      writable:false,
      configurable:false,
      enumerable:false
    })
  }

  ////////////// save
  //
  // @method Save    save the the current item at it;s current state in web storage
  // @usage
  //      Considering we have the following
  //          var person = new Item('person')
  //
  //      We can now Modify the object
  //          person.name = {};
  //          person.name.first = "John"
  //          person.name.last = "Doe"
  //
  //      After modifying the item, we can simply do the following to save it.
  //          person.save()
  //
  Item.prototype.save = function () {
    $local.set(this.storeId, this);
    return
  };

  ////////////// remove
  //
  // @method Remove. Similar to @save but will remove the current item.
  // @usage
  //        var person = new Item('person');
  //            person.remove();
  Item.prototype.remove = function () {
    $local.removeItem(this.storeId)
    delete this
    // console.log('removing!!');
    return
  }

  ///////////////// $Storage
  //
  // @Class $Storage   the actual service passed to angular.module.service
  // Storage is not only going to maintain the state of Storage items and scope,
  // but will also keep it's own local copy of localStorage.
  //
  // @usage instead of accessing the getItem() and setItem() methods from the web Storage API,
  //        We will use the $Storage api, to keep web storage in sync between states.
  //
  // @methods
  //      - @get
  //      - @set
  //      - @remove
  //      - @sync
  //
  function $Storage($rootScope){

    var _this = this;
    _this.root = $rootScope;
    _this.root.$$Storage = {};
    this._storage = {};

  }

  ////////////////// set
  //
  // @method         Set            Set a new property in the local Storage cache.
  // @NOTE                          Items will not be saved in the actual web storage until item.save() is called.
  // @key    {String}               Key property for access into the $Storage cache API, and chache filters.
  // @value  {String|Object|Array}  Values to be stored under @key property.
  // @return {String|Object|Array}  return the retrived objects.
  //
  $Storage.prototype.set = function(key,val){

    return this._storage[key] = new Item(key,val);
  };
  ////////////////// get
  //
  // @method         get   $storage.get will retrive requested Storage values from wither the chache or localStorage
  // @condition            If chache[key] is not defined, the we use the actual value viw
  $Storage.prototype.get = function(key){
    if(this._storage[key]){
      return this._storage[key];
    }
    this._storage[key] = new Item(key)
    return this._storage[key];
  };

  ////////////////// remove
  //
  // @method         remove  remove unecessart properties
  $Storage.prototype.remove = function(key){
    this._storage[key] = {};
    $local.removeItem(key)
  };

  ////////////////// reset
  //
  // @media         Similar to localStorage.clear()
  // @usage         Set's items in cup
  $Storage.prototype.reset = function(key){
    this._storage = {};
    $local.clear();
  };

  ////////////////// sync
  //
  // @method         sync   for linking the currrent to local
  // @scope  {Object}       Pass in the current scope inwhich
  $Storage.prototype.sync = function(scope, key, actualKey){
    scope[key] = this.get(key);
    scope.$watch(key, function(){
      $local.set(key, scope[key]);
    })
    return scope;
  };


}).call(this);