var $zoom = $('#zoom');

function zoomColor() {
  var hexValue = $('.'+colorValue, this).attr('data-hex');
  $zoom.fadeIn('fast');
  $zoom.css('background','#'+hexValue);
  $('a').css('color','#'+hexValue);
};

function zoomOut() {
  $zoom.fadeOut('fast');
  $('a').css('color','');
}

$(function(){
  $(document).keydown(function(e){
    if (e.metaKey || e.ctrlKey) {
      $('.color', $scroller).click(zoomColor);
    } else {
      $('.color', $scroller).click(addToPalette);
    }
  });
  $zoom.click(zoomOut);
});