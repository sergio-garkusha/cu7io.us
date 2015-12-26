// Preloader
window.onload = function () {
  var preload = document.getElementById('preloader-stage');
  var header = document.getElementById('header');
  var headerImage = document.getElementById('headerImage');
  var src = headerImage.getAttribute('src');

  header.style.backgroundImage = 'url(' + window.location.origin + '/' + src + ')';
  headerImage.remove();

  preload.style.opacity = 0;
  setTimeout(function () {
    preload.remove();
  }, 1200);

};
// Preloader END
