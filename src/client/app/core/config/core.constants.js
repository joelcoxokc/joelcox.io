/* global toastr:false, moment:false, TimelineLite:false, TweenMax:false, Cubic:false */
(function() {
    'use strict';

    angular
        .module('core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('TimelineLite', TimelineLite)
        .constant('TweenMax', TweenMax)
        .constant('Cubic', Cubic);
})();
