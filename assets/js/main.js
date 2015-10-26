jQuery(function() {

  "use strict";

  YUI()
    .use('node', function(Y) {
      Y.on('domready', function() {

        var scrolling = false,
          lastScroll,
          i = 0;

        Y.on('scroll', function() {
          if (scrolling === false) {
            fade();
          }

          scrolling = true;
          setTimeout(function() {
            scrolling = false;
            fade();
          }, 0);
        });

        function fade() {

          lastScroll = window.scrollY;

          Y.one('#huge-title')
            .setStyles({
              'transform': 'translate3d(0,' + Math.round(lastScroll / 2) + 'px,0)',
              'opacity': (100 - lastScroll / 4) / 100
            });

          if (scrolling === true) {
            window.requestAnimationFrame(fade);
          }
        }

      });
    });

  var divHeight = jQuery('.height-block')
    .height();
  jQuery('#huge-title')
    .css('min-height', (divHeight + 100) + 'px');

  function setHeight(el) {
    var height = jQuery(window)
      .outerHeight(),
      header = jQuery(el);

    header.css({
      height: height,
      maxHeight: height,
    });
  }

  setHeight('#header');
  setHeight('#footer');
  setHeight('.auto-scrolling');


  var lastScrollTop = 0;
  jQuery(window)
    .on('resize', function(e) {
      setTimeout(function() {
        setHeight('#header');
        setHeight('#footer');
        setHeight('.auto-scrolling');
      }, 200);
    })
    .on('scroll', function() {

      var FOOTER_APPEARS = 200;
      var position = jQuery(this)
        .scrollTop();
      var opacity = jQuery('#huge-title')
        .css('opacity');
      var goDown = jQuery('#go-down');
      var counter = 0;

      if (position > lastScrollTop) {
        // downscroll code
        jQuery("#footer-sticky")
          .slideUp();

        if (opacity < 0.3) {
          goDown.fadeOut();
          jQuery("#logo")
            .fadeOut();
        }

        setTimeout(function() {
          jQuery("#menu-about")
            .hide();
          jQuery("#menu-home")
            .show();
          var footer = jQuery("#footer")
            .offset()
            .top;

          if (counter === 0) {
            if (position + FOOTER_APPEARS > footer) {
              jQuery("#footer-sticky")
                .slideDown();
              jQuery("#logo-footer")
                .fadeIn();
            }

            jQuery('.circle')
              .circleProgress({
                animationStartValue: 0
              })
              .on('circle-animation-progress', function(event, progress, stepValue) {
                jQuery(this)
                  .find('strong')
                  .text(String(stepValue.toFixed(2))
                    .substr(2) + '%');
              });
            counter = 1;
          }

        }, 600);
        console.log('down');
      } else {
        // upscroll code
        jQuery("#footer-sticky")
          .slideUp();
        jQuery("#logo-footer")
          .fadeOut();

        if (opacity > 0.4) {
          goDown.fadeIn();
          jQuery("#logo")
            .fadeIn();
        }

        setTimeout(function() {
          if (position === 0) {
            jQuery("#menu-home")
              .hide();
            jQuery("#menu-about")
              .show();
            jQuery("#logo")
              .show();
            jQuery("#footer-sticky")
              .slideDown();
          }
          counter = 0;
        }, 100);
        // console.log('up');
      }

      lastScrollTop = position;
    });

  jQuery('.go-down-event')
    .on('click', function(e) {
      e.preventDefault();
      jQuery(document.body)
        .animate({
          scrollTop: jQuery("#footer")
            .offset()
            .top
        }, 1000);
    });

  jQuery('.go-up-event')
    .on('click', function(e) {
      e.preventDefault();
      jQuery(document.body)
        .animate({
          scrollTop: 0
        }, 1000);
    });

});
