jQuery(function ($) {

  "use strict";

  YUI().use('node', function (Y) {
    Y.on('domready', function () {

      var scrolling = false,
        lastScroll,
        i = 0;

      Y.on('scroll', function () {
        if (scrolling === false) {
          fade();
        }

        scrolling = true;
        setTimeout(function () {
          scrolling = false;
          fade();
        }, 0);

      });

      function fade() {
        lastScroll = window.scrollY;
        Y.one('#huge-title').setStyles({
          'transform': 'translate3d(0,' + Math.round(lastScroll / 2) + 'px,0)',
          'opacity': (100 - lastScroll / 4) / 100
        });
        if (scrolling === true) {
          window.requestAnimationFrame(fade);
        }
      }

    });
  });

  var divHeight = jQuery('.height-block').height();
  jQuery('#huge-title').css('min-height', (divHeight + 100) + 'px');

  function setHeight(el) {
    var height = jQuery(window).outerHeight();
    var header = jQuery(el);

    header.css({
      height: height,
      maxHeight: height,
    });
  }

  function initCircles() {
    jQuery('.circle').circleProgress({
        animationStartValue: 0
      })
      .on('circle-animation-progress', function (event, progress, stepValue) {
        jQuery(this).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');
      });
  }

  var lastScrollTop = 0;
  var progressSetter = false;
  var counter = 0;
  var height;
  var trigger = 80; // size of the footer

  setHeight('#header');
  if (jQuery(window).scrollTop() > jQuery("#content").offset().top) {
    initCircles();
    progressSetter = true;
  }

  jQuery(window).on('resize', function (e) {
    setTimeout(function () {
      setHeight('#header');
    }, 200);
  })

  .on('scroll', function () {

    var FOOTER_APPEARS = 400;
    var position = jQuery(this).scrollTop();
    var opacity = jQuery('#huge-title').css('opacity');
    var goDown = jQuery('#go-down');
    var footer = jQuery('#footer-sticky');
    var fLogo = jQuery('#logo-footer');
    var logo = jQuery('#logo').parent().parent();

    height = $(window.document).height() - $(window).height();

    if (position > lastScrollTop) {
      // downscroll code
      if (position > height - trigger) {
        footer.slideDown();
        fLogo.fadeIn();
      } else {
        footer.slideUp();
      }

      if (opacity < 0.3) {
        goDown.fadeOut();
        logo.fadeOut();
      }

      setTimeout(function () {
        jQuery("#menu-about").hide();
        jQuery("#menu-home").show();

        var footerOffset = footer.offset().top;

        if (counter === 0) {
          if (position + FOOTER_APPEARS > footerOffset) {
            if (!progressSetter) {
              initCircles();
              progressSetter = true;
            }
          }

          setTimeout(function () {
            counter = 1;
          }, 800);
        }

      }, 600);
      // console.log('down');
    } else {
      // upscroll code
      footer.slideUp();
      fLogo.fadeOut();

      if (opacity > 0.4) {
        goDown.fadeIn();
        logo.fadeIn();
      }

      setTimeout(function () {
        if (position === 0) {
          jQuery("#menu-home").hide();
          jQuery("#menu-about").show();
          logo.fadeIn();
          footer.slideDown();
        }

        setTimeout(function () {
          counter = 0;
        }, 800);

      }, 100);
      // console.log('up');
    }

    lastScrollTop = position;
  });

  jQuery('.go-down-event').on('click', function (e) {
    e.preventDefault();
    jQuery(document.body).animate({
      scrollTop: jQuery("#content").offset().top
    }, 1000);
  });

  jQuery('.go-up-event').on('click', function (e) {
    e.preventDefault();
    jQuery(document.body).animate({
      scrollTop: 0
    }, 1000);
  });

});
