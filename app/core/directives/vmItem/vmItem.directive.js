;(function(){
  'use strict';

  angular
    .module('core')
    .directive('vmItem', vmItem)
    .directive('vmItemHeading', vmItemHeading)
    .directive('vmItemLeft', vmItemLeft)
    .directive('vmItemCenter', vmItemCenter)
    .directive('vmItemTools', vmItemTools)
    .directive('vmItemContent', vmItemContent)
    .controller('vmItemController', vmItemController)

  function vmItemController($scope){
    this.isOpen = false;
    this.toggleOpen = function(){
      this.isOpen = !this.isOpen;
    }
  }


  /* @inject */
  function vmItem($animate) {
    var directive =  {
      templateUrl: 'app/core/directives/vmItem/vmItem.view.html',
      restrict: 'EA',
      scope: {
        item: '=item',
        hasBorder:'@'
      },
      transclude: true,
      replace:true,
      controller: 'vmItemController',
      link: link
    };
    return directive;
    ////////////////

    function link(scope, element, attrs, ctrl) {

      scope.isOpen = ctrl.isOpen;
      scope.toggleOpen = ctrl.toggleOpen;

      scope.$watch('isOpen', function (val){
        if(val){
          angular.element('.vm-item-open').removeClass('vm-item-open', function(){

            $animate.addClass(element, 'vm-item-open');
          })
        } else {
          $animate.removeClass(element, 'vm-item-open');
        }
      });
    }
  }

  function vmItemHeading(){
    return {
      template:'<header class="vm-item-heading row " data-ng-transclude></header>',
      require: '^vmItem',
      restrict: 'EA',
      scope: {
        item:'@'
      },
      replace:true,
      transclude: true,
      link:link
    };
    function link(scope, element, attrs, ctrl){
      element.append(angular.element('<div>').addClass('vm-item-heading-divider'))
    }
  }
  function vmItemLeft(){
    return {
      template:'<aside class="vm-item-left col s3" data-ng-transclude></aside>',
      require: '^vmItem',
      restrict: 'EA',
      scope: true,
      replace:true,
      transclude: true
    };
  }
  function vmItemCenter(){
    return {
      template:'<section class="vm-item-center col s9" data-ng-transclude></section>',
      require: '^vmItem',
      restrict: 'EA',
      scope: true,
      replace:true,
      transclude: true
    };
  }
  function vmItemTools($filter){
    return {
      template:'<div class="vm-item-tools col s3" data-ng-transclude></div>',
      restrict: 'EA',
      scope: true,
      replace:true,
      transclude: true,
    };
  }
  function vmItemContent(){
    return {
      template:'<section class="vm-item-content"><div class="col s12" data-ng-transclude></div></section>',
      require: '^vmItem',
      restrict: 'EA',
      scope: true,
      replace:true,

      transclude: true
    };
  }
}).call(this);
