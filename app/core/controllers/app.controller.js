;(function(tw){

  'use strict';

  angular
    .module('core')
    .controller('AppController',AppController)

  function AppController($scope, $storage){

    this.name = {
      full:"Joel Cox",
      all:"Joel Thomas Cox",
      first:"Joel",
      last:"Cox"
    }
    this.birthday= "September 11, 1990";
    this.email= "Joel.Cox.dev@gmail.com";
    this.phone= "(405) 388 - 7691";
    this.positions = ['UI & UX Desiner', 'Software Engineer'];
    this.address = '7133 Hemlock Street – Oakland, CA 96411'
    var container = angular.element(document.getElementById('container'));
    var section2 = angular.element(document.getElementById('section-2'));

    this.toSection2 = function() {
      console.log('test');
      container.scrollTo(section2, 0, 1000);
    }
  }



}).call(this, TweenMax);
