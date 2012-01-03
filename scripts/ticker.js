$(function(){
  // Get the right command/control value
  function cmd() {
    var $filter = $('.get-cmd')
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("mac") != -1) {
      $filter.text("⌘");
    } else {
      $filter.text("Ctrl.");
    }
  }

  if (!localStorage['hidden_ticker'])
    $body.append('<aside id="welcome_ticker" class="ticker b-sizing">Press <code><span class="get-cmd">cmd/crl</span></code> + <code>C</code> to copy <code class="current-color">(hover a color)</code> to the clipboard. <a title="You won\'t see this message again." id="hide_ticker" class="close" href="javascript:;">&times;</a></aside>');
    cmd();
    $scroller.css('paddingBottom', $('#welcome_ticker').innerHeight())

  $('#hide_ticker').click(function() {
    $('#welcome_ticker').remove(); 
    localStorage.setItem('hidden_ticker', true);
    $scroller.css('paddingBottom', 0)
  });
});