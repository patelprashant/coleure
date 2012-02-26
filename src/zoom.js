var $zoom = $('#zoom');

function zoomColor(e) {
  var hexValue = $('.' + colorValue, e).attr('data-hex');
  $zoom.fadeIn(250);
  $zoom.css('background', '#' + hexValue);
  $('a').css('color', '#' + hexValue);
};

function zoomOut() {
  $zoom.fadeOut(250);
  $('a').css('color', '');
}

$(function() {
  $('.color', $scroller).click(function(e) {
    if (e.metaKey || e.ctrlKey) zoomColor(this);
  });
  $zoom.click(zoomOut);
});

$(document).keypress(function(e) {
  if (e.which == 27) zoomOut();
});