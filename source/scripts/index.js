jQuery(document).ready(function($) {
  // tooltip setup
  $tip = $('a.tip');
  $tip.click(function(e) {
    // links are only there to allow tooltips on touchscreens
    e.preventDefault();
  });
  $tip.on('mouseenter', function() {
    // HACK (powerTip doesn't currently allow canceling):
    // hide tooltip if section content already visible (see CSS media queries)
    $('#powerTip').css('z-index', $(window).width() < 750 ? '-1000' : '2');
  });
  $tip.powerTip({mouseOnToPopup: true, placement: 'w'});

  if (Modernizr.touch || ! Modernizr.video) {
    // don't play background video
    $fallback = $('#video-fallback');
    $fallback.css('display', 'block');
    $fallback.addClass('visible');
  } else {
    // all right, playback video
    var $video = $('#video');
    $video.css('display', 'block');
    var spinOpts = {
      lines: 8,
      length: 20,
      width: 20,
      radius: 5,
      corners: 1,
      rotate: 90,
      color: '#DDD',
      speed: 1.5,
      trail: 75,
      shadow: false,
      hwaccel: true,
      className: 'spinner',
      zIndex: 2e9,
      top: 'auto',
      left: 'auto'
    };
    var spinner = new Spinner(spinOpts);
    $video.bind('loadstart', function() {
      spinner.spin(document.getElementById('video-container'));
    });
    $video.bind('play', function() {
      spinner.stop();
      $video.addClass('visible');
    });
    $video.bind('ended', function() {
      // workaround for inconsistent support for video looping
      this.currentTime = 0;
      this.play();
    });
  }

  $('#main-container').addClass('visible');

});
