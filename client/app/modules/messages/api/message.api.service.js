;(function(){
  'use strict';

    angular
      .module('messages')
      .service('Message', Message);

    function Message($http){

      //////
      ///     @Private   Methods
      //////

      function url(param){
        param = param || '';
        return ['api','messages',param].join('/');
      }

      //////
      ///     @Public   Methods
      //////

      ////////////////////////
      this.all      = function () {

        return $http.get( url() );
      };

      ////////////////////////
      this.one      = function (id) {

        return $http.get( url( id ) );
      };

      ////////////////////////
      this.create   = function (data) {

        return $http.post( url() );
      };

      ////////////////////////
      this.update   = function (id, data) {

        return $http.put( url( id ), data );
      };

      ////////////////////////
      this.destroy  = function (id) {

        return $http.delete( url( id ) );
      };
//////////////////////////////////////////////
    }

}).call(this);