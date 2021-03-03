/* global jQuery, Modernizr */

jQuery(document).ready(function ($) {
  var $video = $('#bg-video'); // eslint-disable-line no-var
  if (Modernizr.touch || !Modernizr.video || !$video.length) {
    // don't play background video
    var $fallback = $('#bg-img'); // eslint-disable-line no-var
    $fallback.css('display', 'block');
    $fallback.addClass('visible');
  } else {
    // all right, playback video
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
