var $body = $('body'),
    $scroller = $('div#scroller'),
    $colors = $('.color'),
    $clip_handler = $('#clipboard_handler'),
    $options = $('ul#options');

// Grabs the current color value and prepends it 
// to an input that will auto select.
////////////////////////////////////////////////
function selectColor(){
  var color_value_text = $('.value', this).text();
  $clip_handler.val(color_value_text).select();
  $('.current-color').text($clip_handler.val())
};
  
function addOption(option){
  if(option.name) {
    $options.append(
      '<li class="option">'+
        (option.shortcut? '<kbd>'+option.shortcut+'</kbd>':'')+
        '<a href="javascript:;" onClick="'+option.run.name+'();">'+option.name+'</a>'+
      '</li>'
    );
  };
  
  if(option.shortcut) {
    $(document).keydown(function(e){
      var pressedKey = String.fromCharCode(e.which)
      switch(pressedKey){
        case option.shortcut:
          option.run();
          break;
      }
    });
  };
};

// Prepends the 
function currentColorToTitle () {
  $('title').text('Copied: '+$clip_handler.val()+' — Coleure');
};

$(function(){
  
  // Changes the color and selects the 
  // color in the hidden input.
  ////////////////////////////////////
  $colors.live("mouseover", selectColor);
  
  // Saves the current scroll state
  /////////////////////////////////
  $scroller.scroll(function(){
    localStorage.setItem('scrolled', $(this).scrollTop())
  });
  $scroller.scrollTop(parseInt(localStorage['scrolled']))
});

$(document).keydown(function(e){
  var pressedKey = String.fromCharCode(e.which);
  
  // Notifies the user that the color has been copied
  ///////////////////////////////////////////////////
  if (e.metaKey || e.ctrlKey) {
    if(pressedKey == 'C') currentColorToTitle();
  };
});