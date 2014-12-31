jQuery(document).ready(function($){


  $nav        = $('.io-nav')
  $nav_inner  = $('.io-nav-inner')
  $nav_header = $nav_inner.find('.io-nav-header')
  $user_icon  = $('.userIcon')
  $nav_text   = $('.io-nav-text > *')

  $title     = $('.io-title')
  $title1    = $('.io-title > h1')

  $navigation = $('.io-navigation')
  $navigation_item   = $navigation.find('.io-navigation-item')
  $navigation_active = $navigation.find('.io-navigation-item.active')
  $navigation_text   = $navigation.find('.io-navigation-item-text')
  $navigation_icon   = $navigation_item.find('i')

  $content = $('.io-content');
        // .add(title()) // 3 sec

  var time = new TimelineLite()

      time
        .from($nav, 1, {height:'0', delay:1}) // 1 sec
        .from($nav_inner, 0.5, {x: '-255px'})
        .from($nav_header, 1, {width:0}, 1)
        .from($user_icon, 0.5, {width:0, height:0, autoAlpha:0, rotation:180}, 1)
        .staggerFrom($nav_text, 0.5, {autoAlpha:0, rotationX:180}, 0.2)

        .from($navigation, 1, {width:0}, 2)
        .staggerFrom($navigation_icon, 0.5, {rotation:'270deg', autoAlpha:0}, 0.1)
        .from($navigation_text, 0.5, {autoAlpha:0, marginLeft:'-20px'})
        .from($navigation_active, 0.5, {background:'rgba(0,0,0,0)'})
        .from($content, 1, {x:100, autoAlpha:0})



  function title(){
    var tl = new TimelineLite()
      return tl
              .from($title1, 0.5, {width: '0px', height: '0px', borderRadius:'100%', ease:Cubic.easeIn, delay:1})
              .from($title1.find('span'), 1, {autoAlpha:0})
              .to($title, 0.5, {autoAlpha:0}, 3)
  }

  function navHeader(){
    var tl = new TimelineLite()
    return tl
  }
  function navigation(){
    var tl = new TimelineLite()
    return tl
            .from($navigation, 1, {width:0})
            .staggerFrom($navigation_icon, 0.5, {rotation:'270deg', autoAlpha:0}, 0.1)
            .from($navigation_text, 0.5, {autoAlpha:0, marginLeft:'-20px'}, 0.3)
            .from($navigation_active, 0.5, {background:'rgba(0,0,0,0)'}, 0)
  }

}(jQuery))