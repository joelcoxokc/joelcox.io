/* global jQuery:false, TimelineLite:false, TweenMax:false, Cubic:false */
jQuery(document).ready(function() {

    'use strict';

    var $nav        = $('.io-nav'),
    $intro     = $('.intro'),
    $inner     = $('.intro-inner'),
    $introTitle = $intro.find('h1'),
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
        .add(title)
        .to($nav, 0, {autoAlpha:1, delay:4.7})
        .from($nav, 1, {y:'-100%', delay:1}) // 1 sec
        .from($navInner, 0.5, {x: '-100%'})
        .from($navHeader, 1, {width:0}, 1)
        // .from($userIcon, 0.5, {width:0, height:0, autoAlpha:0, rotation:180}, 1)
        .staggerFrom($navText, 0.5, {autoAlpha:0, rotationX:180}, 0.2)

        .from($navigation, 1, {x:'-100%'}, 1)
        .staggerFrom($navigationIcon, 0.5, {rotation:'270deg', autoAlpha:0}, 0.1)
        .from($navigationText, 0.5, {autoAlpha:0, marginLeft:'-20px'})
        .from($navigationActive, 0.5, {background:'rgba(0,0,0,0)'})
        .from($content, 1, {x:100, autoAlpha:0}, 6);

    function title() {
        var tl = new TimelineLite();
        tl
            .to($inner, 1, {width:'200px',
                height:'200px',
                marginLeft: '-100px',
                marginTop: '-100px',
                delay:0.5})
            .to($inner, 1, {borderRadius:'0px'}, 1)
            .to($inner, 1, {width:'400px', marginLeft:'-200px'}, 1.5)
            .to($introTitle, 1, {autoAlpha:1}, 1.7)
            .to($introTitle, 1, {autoAlpha:0, delay:1})
            .to($inner, 1, {rotation:'360deg',
                left:'0px',
                top:'0px',
                marginLeft:'0',
                marginTop:'0',
                width:'250px',
                height:'10px'}, 4.5)
            .to($inner, 1, {autoAlpha:0}, 5)
            .to($intro, 0, {display:'none'});
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
