// Preloader
jQuery(window).load(function() {
  var preload = jQuery('#preloader-stage');
  var header = jQuery('#header');
  var headerImage = jQuery('#headerImage');
  var src = headerImage.attr('src');

  header.css({'background-image': 'url(' + window.location.href + src + ')'});
  headerImage.remove();

  preload.find('h1').slideToggle(900);
  preload.fadeOut(1200);
  setTimeout(function() {
    preload.remove();
  }, 1200);
});
// Preloader END
