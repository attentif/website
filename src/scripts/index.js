/* global jQuery, Modernizr */

jQuery(document).ready(function ($) {
  if (Modernizr.touch || !Modernizr.video) {
    // don't play background video
    var $fallback = $('#video-fallback'); // eslint-disable-line no-var
    $fallback.css('display', 'block');
    $fallback.addClass('visible');
  } else {
    // all right, playback video
    var $video = $('#video'); // eslint-disable-line no-var
    $video.css('display', 'block');
    $video.bind('play', function () {
      $video.addClass('visible');
    });
    $video.bind('ended', function () {
      // workaround for inconsistent support for video looping
      this.currentTime = 0;
      this.play();
    });
  }

  $('#main-container').addClass('visible');
});
