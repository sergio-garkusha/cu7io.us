document.addEventListener("DOMContentLoaded", function () {

  "use strict";

  var FOOTER_APPEARS = 400;
  var TRIGGER = 80; // size of the footer

  var scrolling = false;
  var lastScroll;

  var heroTitle = document.getElementById('hero-title');
  var mainLogo = document.getElementById('logo-large-screens');
  var goDownButton = document.getElementById('go-down');

  var highColor = 'rgb(98, 40, 140)';
  var lowColor = 'rgb(32, 152, 132)';

  var lastScrollTop = 0;
  var progressSetter = false;
  var counter = 0;
  var height;
  var header = document.getElementById('header');
  var cotnentTop = document.getElementById('content').getBoundingClientRect().top;

  var footer = document.getElementById('footer-sticky');
  var footerLogo = document.getElementById('logo-footer');
  var menuHome = document.getElementById('menu-home');
  var menuAbout = document.getElementById('menu-about');


  // Utils
  function fade() {

    lastScroll = window.scrollY;

    heroTitle.style.transform = 'translate3d(0,' + Math.round(lastScroll / 2) + 'px,0)';
    heroTitle.style.opacity = (100 - lastScroll / 4) / 100;

    mainLogo.style.transform = 'translate3d(0,' + Math.round(lastScroll / 14) + 'px,0)';
    mainLogo.style.opacity = (100 - lastScroll / 4) / 100;

    goDownButton.style.opacity = (100 - lastScroll / 4) / 100;

    if (scrolling === true) {
      window.requestAnimationFrame(fade);
    }
  }

  function initCircles() {
    makeCircle('container1', 0.95, highColor);
    makeCircle('container2', 0.80, highColor);
    makeCircle('container3', 0.70, lowColor);
    makeCircle('container4', 0.30, lowColor);
  }

  function setHeight(el) {
    var elHeight = document.body.offsetHeight;
    el.style.height = elHeight + 'px';
    el.style.maxHeight = elHeight + 'px';
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

  function makeCircle(DOMel, qty, color) {
    var element = document.getElementById(DOMel);
    var circle = new ProgressBar.Circle(element, {
      color: color,
      trailColor: '#e6e6e6',
      trailWidth: 2,
      duration: 2000,
      easing: 'easeOut',
      strokeWidth: 4,
      text: {
        value: '0'
      },

      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.setText((circle.value() * 100).toFixed(0));
      }
    });

    circle.animate(qty);
  }
  // Utils END


  window.addEventListener('scroll', function () {

    if (scrolling === false) {
      fade();
    }

    scrolling = true;

    setTimeout(function () {
      scrolling = false;
      fade();
    }, 0);

  });

  // Executions block
  heroTitle.style.minHeight = (heroTitle.childNodes[1].offsetHeight + 100) + 'px';

  setHeight(header);

  if (window.scrollY > cotnentTop) {
    initCircles();
    progressSetter = true;
  }

  window.addEventListener("resize", function () {
    setTimeout(function () {
      setHeight(header);
    }, 200);
  })

  window.addEventListener("scroll", function () {
    var position = window.scrollY;

    height = document.body.scrollHeight - document.body.offsetHeight;

    if (position > lastScrollTop) {
      // downscroll code
      if (position > height - TRIGGER) {
        footer.classList.remove('footer-closed');
        footerLogo.style.opacity = '1';
      } else {
        footer.classList.add('footer-closed');
      }

      setTimeout(function () {
        menuAbout.style.display = 'none';
        menuHome.style.display = 'block';

        var footerOffset = footer.getBoundingClientRect().top;

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
      footer.classList.add('footer-closed');
      footerLogo.style.opacity = '0';

      setTimeout(function () {
        if (position === 0) {
          menuAbout.style.display = 'block';
          menuHome.style.display = 'none';
          footer.classList.remove('footer-closed');
        }

        setTimeout(function () {
          counter = 0;
        }, 800);

      }, 100);
      // console.log('up');
    }

    lastScrollTop = position;
  });

  // Animate Scrolling to content on click on the elements
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

// Executions block
