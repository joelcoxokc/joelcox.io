;(function(){
  'use strict';

  angular
    .module('core')
    .config( Core );

    function Core ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/')

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/core/views/home.view.html',
          controller:  'HomeController as vm'
        });

      ////////////////////////

    }

}).call(this);