$(function(){
  $(window).resize(function() {
    localStorage['palette_hidden'] == "true" ? $('.scroller').css('top', 0):$('.scroller').css('top', $('.palette').innerHeight())
    $('.scroller').scroll(function(){
      localStorage.setItem('scrolled', localStorage['palette_hidden'] == "true" ? $(this).scrollTop() : $(this).scrollTop()-$('.palette').innerHeight())
    });
  });
});