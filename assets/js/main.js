document.addEventListener("DOMContentLoaded", function () {

  "use strict";

  // Header Scroll Animation
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

        Y.one('#logo-large-screens').setStyles({
          'transform': 'translate3d(0,' + Math.round(lastScroll / 8) + 'px,0)',
          'opacity': (100 - lastScroll / 4) / 100
        });

        Y.one('#go-down').setStyles({
          'opacity': (100 - lastScroll / 4) / 100
        });

        if (scrolling === true) {
          window.requestAnimationFrame(fade);
        }
      }

    });
  });
  // Header Scroll Animation END

  var hugeTitle = document.getElementById('huge-title');
  var divHeight = hugeTitle.childNodes[1].offsetHeight;
  hugeTitle.style.minHeight = (divHeight + 100) + 'px';

  function setHeight(el) {
    var height = document.body.offsetHeight;

    el.style.height = height + 'px';
    el.style.maxHeight = height + 'px';
  }

  function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function () {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      scrollTo(element, to, duration - 10);
    }, 10);
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
  var header = document.getElementById('header');
  var cotnentTop = document.getElementById('content').getBoundingClientRect().top;

  setHeight(header);

  if (window.scrollY > cotnentTop) {
    initCircles();
    progressSetter = true;
  }

  window.addEventListener("resize", function (e) {
    setTimeout(function () {
      setHeight(header);
    }, 200);
  })

  window.addEventListener("resize", function () {

    var FOOTER_APPEARS = 400;
    var position = window.scrollY;
    // var position = jQuery(this).scrollTop();
    var opacity = jQuery('#huge-title').css('opacity');
    var goDown = jQuery('#go-down');
    var footer = jQuery('#footer-sticky');
    var fLogo = jQuery('#logo-footer');

    height = jQuery(window.document).height() - jQuery(window).height();

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
      }

      setTimeout(function () {
        if (position === 0) {
          jQuery("#menu-home").hide();
          jQuery("#menu-about").show();
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

  // Animate Scrollig to content on click on the elements
  var goDownElements = document.getElementsByClassName('go-down-event');
  goDownElements = Array.prototype.slice.call(goDownElements);
  goDownElements.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var cotnentTop = document.getElementById('content').getBoundingClientRect().top;
      scrollTo(document.body, cotnentTop, 800);
    });
  });

  // Animate Scrolling to top on click on the elements
  var goDownElements = document.getElementsByClassName('go-up-event');
  goDownElements = Array.prototype.slice.call(goDownElements);
  goDownElements.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      scrollTo(document.body, 0, 1000);
    });
  });

});
