;(function() {
    'use strict';

    angular
        .module('core')
        .directive('mvVm', mvVm);

    /* @ngInject */
    function mvVm($animate, TimelineLite, TweenMax, Cubic) {
        return {
            templateUrl: 'app/core/directives/mvVm/mvVm.view.html',
            restrict: 'E',
            scope: {
                title: '@',
                subtitle: '@'
            },
            transclude: true,
            replace: true,
            link: link
        };

        ////////////////

        function link(scope, element, attrs, ctrl, transclude) {
            // Mv vm directive logic

            var $line       = $('.line'),
                $title1     = $('.line .c'),
                $container  = $('.container'),
                $component  = $('.components > .component');

            transclude(function (clone) {
                element.append(clone);
                initialize();
            });

            function initialize() {
                console.log(scope);
                if (scope.title) {
                    intro(function() {
                        addUtilityClasses();
                    });
                } else {
                    showComponents();
                }
            }

            function intro(cb) {
                var toggleTitle = new TimelineLite();
                toggleTitle.to($title1, 1, {autoAlpha:1})
                    .to($title1, 0.1, {autoAlpha:0, delay:1});

                var time = new TimelineLite();
                time
                    .to($line, 0.3, {
                        height:'100px',
                        marginTop:'-=25px',
                        width:'200px',
                        marginLeft: '-100px',
                        ease:Cubic.easeOut,
                        borderRadius:0
                    })
                    .add(toggleTitle)
                    .to($line, 0.2, {height:'20px'}, 2.5)

                    .to($line, 0.5, {
                        rotation:'180deg',
                        width:'5px',
                        left:'2px',
                        marginLeft:'20px',
                        marginTop:'0',
                        top:'0'
                    })
                    .to($line, 0.5, {height:'100%', onComplete:showComponents})
                    .to($line, 0.5, {autoAlpha:0, onComplete:cb});
            }

            function addUtilityClasses() {
                $('.vm-item').append($('<div>').addClass('list-divider'));
            }

            function showComponents() {
                return TweenMax
                    .to($('.component'), 1, {autoAlpha:1});
            }
        }

    }
}).call(this);
