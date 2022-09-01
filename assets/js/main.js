// Vanilla JavaScript (helps to deepen knowledge and learn to appreciate frameworks more :)
// Dated code with modern modifications
document.addEventListener("DOMContentLoaded", function() {
  const IS_FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  const IS_CHROME_61 = getChromeVersion()

  let scrolling = false;
  let lastScroll;

  const heroTitle = document.getElementById('hero-title');
  const mainLogo = document.getElementById('logo-large-screens');
  const goDownButton = document.getElementById('go-down');

  // Just in case :_)
  // const highColor = 'rgb(98, 40, 140)';
  // const lowColor = 'rgb(32, 152, 132)';

  var lastScrollTop = 0;
  var progressSetter = false;
  var counter = 0;
  var header = document.getElementById('header');
  var contentTop = document.getElementById('content').getBoundingClientRect().top;

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

  const works = document.querySelectorAll('.work-item');
  const workDetails = document.getElementById('works-container');
  const cLeft = document.getElementById('content-left');
  const cRight = document.getElementById('content-right');
  const closeX = document.getElementById('closex');

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

  closeX.addEventListener("click", function(e) {
    worksCloseActions();
  }, true);
  workDetails.addEventListener("click", function(e) {
    worksCloseActions();
  }, true);
  document.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) {
      worksCloseActions();
    }
  });

  (async () => {
    const projects = await fetch('/assets/projects/projects.json').then(r => r.json());
    const { projectDescriptions, projectPictures } = projects;
    works.forEach(function (el, idx) {
      el.addEventListener("click", function (e) {
        e.preventDefault();

        document.getElementById('cont').innerHTML = projectDescriptions[idx];
        document.getElementById('img').innerHTML = projectPictures[idx];

        workDetails.style.display = 'block';
        document.body.style.overflow = 'hidden';

        setTimeout(function () {
          workDetails.style.opacity = '1';
          workDetails.style.visibility = 'visible';
        }, 200);

        setTimeout(function () {
          cLeft.classList.add('show');
          cRight.classList.add('show');
        }, 500);
      }, true);
    });
  })();
  // works section END }

  function setHeight(el) {
    var elHeight = document.body.offsetHeight;
    el.style.height = elHeight + 'px';
    el.style.maxHeight = elHeight + 'px';
  }

  function scrollTo(element, to, duration) {
    if (duration <= 0) return;

    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      scrollTo(element, to, duration - 10);
    }, 10);
  }

  // Google Chrome changed scrollTop behaviour since version 61+
  // Previously it worked with the `body` element,
  // Now it works only with the `html` element.
  // To support older version of Chrome/Chromium
  // and Safari (it utilizes the same behaviour as older Chrome)
  // we need to check the version of browser and adapt our solution to it
  //
  // Code was taken from here:
  // https://stackoverflow.com/questions/4900436/how-to-detect-the-installed-chrome-version#answer-4900484
  function getChromeVersion () {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false;
  }
  // Utils END

  window.addEventListener('scroll', function() {

    if (scrolling === false) {
      fade();
    }

    scrolling = true;

    setTimeout(function() {
      scrolling = false;
      fade();
    }, 0);
  });

  // Executions block
  heroTitle.style.minHeight = (heroTitle.childNodes[1].offsetHeight + 100) + 'px';

  setHeight(header);

  if (window.scrollY > contentTop) {
    progressSetter = true;
  }

  let projectsContentTop;
  window.addEventListener("resize", function() {
    setTimeout(function() {
      setHeight(header);
      projectsContentTop = null;
    }, 200);
  })

  const FOOTER_APPEARS = 400;
  const FOOTER_HEIGHT = 80;
  let height;
  window.addEventListener("scroll", function() {
    const position = window.scrollY;
    height = document.body.scrollHeight - document.body.offsetHeight;

    if (position > lastScrollTop) {
      // downscroll code
      if (position > height - FOOTER_HEIGHT) {
        footer.classList.remove('footer-closed');
        footerLogo.style.opacity = '1';
      } else {
        footer.classList.add('footer-closed');
      }

      setTimeout(function() {
        menuAbout.style.display = 'none';
        menuHome.style.display = 'block';

        var footerOffset = footer.getBoundingClientRect().top;

        if (counter === 0) {
          if (position + FOOTER_APPEARS > footerOffset) {
            if (!progressSetter) {
              progressSetter = true;
            }
          }

          setTimeout(function() {
            counter = 1;
          }, 800);
        }

      }, 600);
    } else {
      // upscroll code
      footerLogo.style.opacity = '0';

      setTimeout(function() {

        footer.classList.remove('footer-closed');

        if (position <= 0) {
          menuAbout.style.display = 'block';
          menuHome.style.display = 'none';
        }

        counter = 0;

      }, 100);
    }

    setTimeout(function() {
      lastScrollTop = position;
    }, 810);
  });

  // Animate Scrolling to content on click on the elements
  let goDownElements = document.getElementsByClassName('go-down-event');
  var elToScroll = (IS_FIREFOX || IS_CHROME_61 && IS_CHROME_61 >= 61)
    ? document.getElementsByTagName('html')[0]
    : document.body
  goDownElements = Array.prototype.slice.call(goDownElements);
  goDownElements.forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const contentTop = document.getElementById('content').getBoundingClientRect().top;
      // console.log(contentTop);
      scrollTo(elToScroll, contentTop, 500);
    }, false);
  });

  // Animate Scrolling to content on click on the elements
  (function() {
    var toWorks = document.getElementById('menu-works');
    toWorks.addEventListener('click', function(e) {
      e.preventDefault();
      var elToScroll = (IS_FIREFOX || IS_CHROME_61 && IS_CHROME_61 >= 61)
        ? document.getElementsByTagName('html')[0]
        : document.body
      projectsContentTop = projectsContentTop
        ? projectsContentTop
        : document.getElementById('portfolio').getBoundingClientRect().top;
      scrollTo(elToScroll, projectsContentTop, 500);
    }, false);
  })()

  // Animate Scrolling to top on click on the elements
  var goUpElements = document.getElementsByClassName('go-up-event');
  var elToScroll = (IS_FIREFOX || IS_CHROME_61 && IS_CHROME_61 >= 61)
    ? document.getElementsByTagName('html')[0]
    : document.body
  goUpElements = Array.prototype.slice.call(goUpElements);
  goUpElements.forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      scrollTo(elToScroll, 0, 1000);
    }, false);
  });

  // Typewriter feature
  (function() {
    var cnt = 0;
    var sentences = [
      "Zen of Python.",
      "Expressive Nim language.",
      "Handcrafted Designs.",
      "Progressive and Accessive Apps.",
      "Bulletproof Servers & APIs.",
      "Deep Neuro Nets.",
      "Good old vanilla JavaScript.",
      "Modern TypeScript."
    ];

    var str;
    var i = 1;
    var text;

    function type() {
      text = str.slice(0, i++);
      document.getElementById('created-item-text').innerText = text;
      text.slice();

      if (text === str) {
        i = 1;
        return
      };

      setTimeout(type, 100);
    }

    setInterval(function() {
      if (cnt === sentences.length) {
        cnt = 0;
      }

      var evt = new CustomEvent('type-header-text', {
        detail: {
          sentence: sentences[cnt]
        }
      });

      cnt++;

      window.dispatchEvent(evt);
    }, 5000)

    window.addEventListener('type-header-text', function(e) {
      str = e.detail.sentence;
      type();
    }, false);
  })();

});
