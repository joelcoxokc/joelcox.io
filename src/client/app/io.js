/* global jQuery:false, TimelineLite:false, TweenMax:false, Cubic:false */
jQuery(document).ready(function() {

    'use strict';

    var $nav        = $('.io-nav'),
    $navInner  = $('.io-nav-inner'),
    $navHeader = $navInner.find('.io-nav-header'),
    $userIcon  = $('.userIcon'),
    $navText   = $('.io-nav-text > *'),

    $title     = $('.io-title'),
    $title1    = $('.io-title > h1'),

    $navigation = $('.io-navigation'),
    $navigationItem   = $navigation.find('.io-navigation-item'),
    $navigationActive = $navigation.find('.io-navigation-item.active'),
    $navigationText   = $navigation.find('.io-navigation-item-text'),
    $navigationIcon   = $navigationItem.find('i'),
    $content = $('.io-content');

    var time = new TimelineLite();

    time
        .to($nav, 0, {autoAlpha:1})
        .from($nav, 1, {y:'-100%', delay:1}) // 1 sec
        .from($navInner, 0.5, {x: '-100%'})
        .from($navHeader, 1, {width:0}, 1)
        // .from($userIcon, 0.5, {width:0, height:0, autoAlpha:0, rotation:180}, 1)
        .staggerFrom($navText, 0.5, {autoAlpha:0, rotationX:180}, 0.2)

        .from($navigation, 1, {x:'-100%'}, 1)
        .staggerFrom($navigationIcon, 0.5, {rotation:'270deg', autoAlpha:0}, 0.1)
        .from($navigationText, 0.5, {autoAlpha:0, marginLeft:'-20px'})
        .from($navigationActive, 0.5, {background:'rgba(0,0,0,0)'})
        .from($content, 1, {x:100, autoAlpha:0}, 4);

    function title() {
        var tl = new TimelineLite();
        return tl
            .from($title1, 0.5, {width: '0px', height: '0px', borderRadius:'100%', ease:Cubic.easeIn, delay:1})
            .from($title1.find('span'), 1, {autoAlpha:0})
            .to($title, 0.5, {autoAlpha:0}, 3);
    }

    function navigation() {
        var tl = new TimelineLite();
        return tl
            .from($navigation, 1, {width:0})
            .staggerFrom($navigationIcon, 0.5, {rotation:'270deg', autoAlpha:0}, 0.1)
            .from($navigationText, 0.5, {autoAlpha:0, marginLeft:'-20px'}, 0.3)
            .from($navigationActive, 0.5, {background:'rgba(0,0,0,0)'}, 0);
    }

});
