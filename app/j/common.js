var $scroller = $('div#scroller'),
    $clip_handler = $('#clipboard_handler'),
    $options = $('#options');

// Grabs the current color value and prepends it 
// to an input that will auto select.
////////////////////////////////////////////////
function selectColor(){
    var color_value_text = $('.color_value', this).text();
    $clip_handler.val(color_value_text).select();
    $('.current-color').text($clip_handler.val())
  };
  
function addOption(option){
  $options.append(
    '<li class="option">'+
    (option.shortcut? '<kbd>'+option.shortcut+'</kbd>':'')+
    '<a href="javascript:;">'+option.name+'</a></li>'
  );
  
  $(document).keydown(function(e){
    var pressedKey = String.fromCharCode(e.which)
    switch(pressedKey){
      // Switches between outputs for each format
      case option.shortcut:
        option.run;
        break;
    }
  });
};

addOption({name:'Test option', shortcut: 'G', run:alert('WOO HOO')});

$(function(){
  var $colors = $('.color');
  //if(navigator.userAgent.match(/iPad/i)) alert('U R USING IPAZ');
  //if(navigator.userAgent.match(/iPhone/i)) window.top.scrollTo(0, 1);

  // Sets the value of the clipboard handler input
  // and selects it ready to be copied.
  $colors.hover(selectColor);
  
  $(document).keydown(function(e){
    var pressed_key = String.fromCharCode(e.which)
    switch(pressed_key){
      // Hides (or shows) the palette
      case 'E':
        togglePalette();
        break;
    }
    // Notifies the user that the color has been copied
    if (e.metaKey || e.ctrlKey) {
      if (pressed_key == 'C') $('title').text('Last copied: '+$clip_handler.val()+' — Coleure')
    }
  });
  $('.scroller').scroll(function(){
    localStorage.setItem('scrolled', $(this).scrollTop())
  });
  $('.scroller').scrollTop(parseInt(localStorage['scrolled']))
});