document.addEventListener("DOMContentLoaded", function () {

  "use strict";

  var FOOTER_APPEARS = 400;
  var FOOTER_HEIGHT = 80;

  var IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

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
  var contentTop = document.getElementById('content').getBoundingClientRect().top;

  var footer = document.getElementById('footer-sticky');
  var footerLogo = document.getElementById('logo-footer');
  var menuHome = document.getElementById('menu-home');
  var menuAbout = document.getElementById('menu-about');

  var myWorksContentTop

  var myWorksContentTop
  var worksDescriptions = [
    '<h4>SentiSum</h4><p>Leverage AI to gain competitive advantage.</p><br/><p>Tech Stack: <ul><li> Node.js / Feathers.js / MongoDB</li><li>React.js / Webpack / Ant.d / Socket.io</li><li>Docker / AWS / NginX</li></ul></p><a target="_blank" href="//sentisum.com" class="border-button">Check Online</a>',
    '<h4>Zentist</h4><p>Find and finance high-quality and affordable dental care</p><br/><p>Tech Stack: <ul><li>PHP FPM / Symphony / MySQL</li><li>Angular.js / React.js / SASS / jQuery</li><li>AWS / Ubuntu LEMP Stack</li></ul></p><a target="_blank" href="//zentist.io" class="border-button">Check Online</a>',
    '<h4>MotoPress</h4><p>MotoPress Visual Page Builder enhances the standard WordPress builder and enables to build websites visually. It’s the complete solution for building responsive pages without coding and simply by dragging and dropping content elements.</p><br/><p>Tech Stack: <ul><li>Ubuntu LAMP stack</li><li>jQuery /JMVC / Grunt.js</li><li>WordPress / Composer</li></ul></p><a target="_blank" href="//getmotopress.com" class="border-button">Check Online</a>',
  ];

  var worksPictures = [
    '<img src="./assets/images/Senti1.png"><img src="./assets/images/Senti2.png"><img src="./assets/images/Senti3.png">',
    '<img src="./assets/images/zent5.jpg"><img src="./assets/images/zent2.jpg"><img src="./assets/images/zent3.jpg"><img src="./assets/images/zent4.jpg"><img src="./assets/images/zent.jpg">',
    '<img src="./assets/images/moto2.jpg"><img src="./assets/images/Moto4.png"><img src="./assets/images/moto3.png"><div style="position:relative;height:0;padding-bottom:75.0%"><iframe src="https://www.youtube.com/embed/Q8fdnBmwtOY?ecver=2" width="480" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>'
  ];

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

  var works = document.querySelectorAll('.work-item');
  var workDetails = document.getElementById('works-container');
  var cLeft = document.getElementById('content-left');
  var cRight = document.getElementById('content-right');
  var closex = document.getElementById('closex');

// works section {
  function worksCloseActions() {
    setTimeout(function() {
      cLeft.classList.remove('show');
      cRight.classList.remove('show');
    }, 500);

    setTimeout(function() {
      workDetails.style.visibility = 'hidden';
      workDetails.style.opacity = '0';
    }, 600);

    setTimeout(function() {
      workDetails.style.display = 'none';
      document.body.style.overflow = 'initial';
    }, 1200);
  }

  closex.addEventListener("click", function(e) {
    worksCloseActions();
  }, true);
  workDetails.addEventListener("click", function(e) {
    worksCloseActions();
  }, true);
  document.addEventListener('keyup', function(e) {
    if (e.keyCode == 27) {
      worksCloseActions();
    }
  })
// works section END }

  works.forEach(function(el, idx) {
    el.addEventListener("click", function(e) {
      e.preventDefault();

      document.getElementById('cont').innerHTML = worksDescriptions[idx]
      document.getElementById('img').innerHTML = worksPictures[idx]

      workDetails.style.display = 'block';
      document.body.style.overflow = 'hidden';

      setTimeout(function() {
        workDetails.style.opacity = '1';
        workDetails.style.visibility = 'visible';
      }, 200);

      setTimeout(function() {
        cLeft.classList.add('show');
        cRight.classList.add('show');
      }, 500);
    }, true);
  });

  // function initCircles() {
  //   makeCircle('container1', 0.95, highColor);
  //   makeCircle('container2', 0.95, highColor);
  //   makeCircle('container3', 0.95, lowColor);
  //   makeCircle('container4', 0.95, lowColor);
  // }

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

  // function makeCircle(DOMel, qty, color) {
  //   var element = document.getElementById(DOMel);
  //   var circle = new ProgressBar.Circle(element, {
  //     color: color,
  //     trailColor: '#e6e6e6',
  //     trailWidth: 2,
  //     duration: 2000,
  //     easing: 'easeOut',
  //     strokeWidth: 4,
  //     text: {
  //       value: '0'
  //     },
  //
  //     // Set default step function for all animate calls
  //     step: function (state, circle) {
  //       circle.setText((circle.value() * 100).toFixed(0));
  //     }
  //   });
  //
  //   circle.animate(qty);
  // }
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

  if (window.scrollY > contentTop) {
    // initCircles();
    progressSetter = true;
  }

  window.addEventListener("resize", function () {
    setTimeout(function () {
      setHeight(header);
      myWorksContentTop = null;
    }, 200);
  })

  window.addEventListener("scroll", function () {
    var position = window.scrollY;

    // console.log(position);

    height = document.body.scrollHeight - document.body.offsetHeight;

    if (position > lastScrollTop) {
      // downscroll code
      if (position > height - FOOTER_HEIGHT) {
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
              // initCircles();
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
      // footer.classList.add('footer-closed');
      footerLogo.style.opacity = '0';

      setTimeout(function () {

        footer.classList.remove('footer-closed');

        if (position <= 0) {
          menuAbout.style.display = 'block';
          menuHome.style.display = 'none';
        }

        // setTimeout(function () {
          counter = 0;
        // }, 800);

      }, 100);
      // console.log('up');
    }

    setTimeout(function () {
      lastScrollTop = position;
    }, 810);
  });

  // Animate Scrolling to content on click on the elements
  var goDownElements = document.getElementsByClassName('go-down-event');
  var elToScroll = IS_FIREFOX ? document.getElementsByTagName('html')[0] : document.body
  goDownElements = Array.prototype.slice.call(goDownElements);
  goDownElements.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var contentTop = document.getElementById('content').getBoundingClientRect().top;
      scrollTo(elToScroll, contentTop, 500);
    }, false);
  });

  // Animate Scrolling to content on click on the elements
  (function() {
    var toWorks = document.getElementById('menu-works');
    toWorks.addEventListener('click', function (e) {
      e.preventDefault();
      var elToScroll = IS_FIREFOX ? document.getElementsByTagName('html')[0] : document.body
      myWorksContentTop = myWorksContentTop
        ? myWorksContentTop
        : document.getElementById('portfolio').getBoundingClientRect().top;
      console.log(myWorksContentTop);
      scrollTo(elToScroll, myWorksContentTop, 500);
    }, false);
  })()

  // Animate Scrolling to top on click on the elements
  var goDownElements = document.getElementsByClassName('go-up-event');
  var elToScroll = IS_FIREFOX ? document.getElementsByTagName('html')[0] : document.body
  goDownElements = Array.prototype.slice.call(goDownElements);
  goDownElements.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      scrollTo(elToScroll, 0, 1000);
    }, false);
  });

  // Typewriter
  (function() {
    var CNT = 0;
    var Sentences = [
      "Reactive Web Apps..",
      "Bulletproof APIs..",
      "Robust WordPress Themes..",
      "Handcrafted Plugins..",
      "Tasty Web Templates.."
    ];

    var str;
    var i = 0;
    var isTag, text;

    function type () {
      text = str.slice(0, i++);
      if (text === str) {
        i = 0;
        return
      };
      document.getElementById('created-item-text').innerText = text;
      var char = text.slice(-1);
      setTimeout(type, 80);
    }

    setInterval(function() {
      if (CNT > 3) CNT = 0;
      var evt = new CustomEvent('type-header-text', {detail: {
        sentence: Sentences[CNT]
      }});
      CNT = CNT + 1;
      window.dispatchEvent(evt);
    }, 5000)

    window.addEventListener('type-header-text', function (e) {
      str = e.detail.sentence;
      type();
    }, false);
  })();

});

// Executions block
