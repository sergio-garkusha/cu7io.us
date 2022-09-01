// Preloader
window.onload = function () {
  setTimeout(() => {
    const preload = document.getElementById('preloader-stage');
    // const header = document.getElementById('header');
    // const headerImage = document.getElementById('headerImage');
    // const src = headerImage.getAttribute('src');

    // header.style.backgroundImage = 'url(' + window.location.origin + '/' + src + ')';
    // headerImage.remove();

    preload.style.opacity = 0;
    setTimeout(function () {
      preload.remove();
    }, 1200);
  }, 1000);
};
// Preloader END
