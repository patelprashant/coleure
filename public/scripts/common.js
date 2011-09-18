$(function(){
  var $body = $('body'),
      $palette = $('#colors_palette'),
      $colors = $('.color'),
      $scroller = $('div#scroller'),
      $clip_handler = $('#clipboard_handler'),
      $ins = $('#ins'),
      ins_html = $ins.html()

  // Hides or shows palette
  if (localStorage['palette_hidden']) {
    localStorage['palette_hidden'] == "false" ? shows_palette() : hides_palette()
  } else {
    localStorage.setItem('palette_hidden', true)
    hides_palette()
  }

  // Sets the value of the clipboard handler input
  // and selects it ready to be copied.
  function selects_color_value(){
    var $color_value = $('.color_value', this),
        color_value_text = $color_value.text();
    $clip_handler.val(color_value_text).select();
    $('.ins_code').text($clip_handler.val())
  };
  $colors.hover(selects_color_value);

  // Removes item from palette (db, not visually)
  function remove_from_palette(){
    palette_array.splice($(this).index(), 1)
    $(this).remove();

    // Saves the state of the palette to the DB
    // NOTE: This _needs_ to be AFTER `palette_array.push(color_value_text)`
    localStorage['palette'] = JSON.stringify(palette_array)
  };
  $('#chosen_colors .color').click(remove_from_palette);
  
  // Shows the palette and scrolls
  function shows_palette () {
    if ($(window).width() >= 1400){
      $body.addClass('palette-shown');
    } else {
      $('.scroller').scrollTop($('.scroller').scrollTop()+$palette.innerHeight());
      $('.scroller').css('top', $palette.innerHeight())
    }
    $palette.show();
  }
  // Hides the palette and scrolls again
  function hides_palette () {
    if ($(window).width() >= 1400){
      $body.removeClass('palette-shown')
    } else {
      $('.scroller').scrollTop($('.scroller').scrollTop()-$palette.innerHeight());
      $('.scroller').css('top', 0)
    }
    $palette.hide();
  }
  function handle_palette() {
    localStorage['palette_hidden'] == "true"? shows_palette() : hides_palette();
    localStorage['palette_hidden'] = !(localStorage['palette_hidden'] == "true");
  }

  // Adds a color to the palette (and shows it)
  var palette_array = localStorage['palette']? JSON.parse(localStorage['palette']):[]
  $('#scroller .color').click(function(e){
    var color_value_text = $('.color_value', this).attr('data-hex');
    
    // Sets the limit of colors
    // if (palette_array.length > 9){
    //   palette_array.shift();
    //   $('#chosen_colors .color:first-child').remove(); }

    // Appends the color to the palette and saves its color_value to the array
    $(this).clone(
      ).prependTo(
        '#chosen_colors'
      ).hover(
        selects_color_value
      ).click(
        remove_from_palette
      );
    palette_array.unshift(color_value_text)

    // Saves the state of the palette to the DB
    // NOTE: This _needs_ to be AFTER `palette_array.push(color_value_text)`
    localStorage['palette'] = JSON.stringify(palette_array)

    // Shows the palette
    if (localStorage['palette_hidden'] == 'true') shows_palette();
    localStorage['palette_hidden'] = false
  });

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
    $('body').append('<aside id="welcome_ticker" class="ticker b-sizing">Press <code><span class="get-cmd">cmd/crl</span></code> + <code>C</code> to copy <code class="ins_code">(hover a color)</code> to the clipboard. <a title="You won\'t see this message again." id="hide_ticker" class="close" href="javascript:;">&times;</a></aside>');
    cmd()

  $('#hide_ticker').click(function() {
    $('#welcome_ticker').remove(); 
    localStorage.setItem('hidden_ticker', true)
  })

  // Media queries to show the current color to be copied
  function ins_mediaq() {
    if ($(window).width() < 721){
      $ins.html('<big><code>Ω</code> = <code class="ins_code">(hover a color)</code></big>')
    } else if ($(window).width() >= 721) {
      $ins.html(ins_html);
    }
    cmd()
  }
  ins_mediaq();
  $(window).resize(function() {
    ins_mediaq();
    palette_hidden ? $('.scroller').css('top', 0):$('.scroller').css('top', $('.palette').innerHeight())
    $('.scroller').scroll(function(){
      localStorage.setItem('scrolled', palette_hidden? $(this).scrollTop() : $(this).scrollTop()-$('.palette').innerHeight())
    });
  });
  
  $('#show_palette').click(function() {handle_palette();});

  // Needed for the subsequent functions
  function clear_palette() {
    localStorage.removeItem('palette');
    palette_array = []
    $('#chosen_colors .color').remove();
  }
  $('#clear_palette').click(function() {
    clear_palette(); 
  })

  var $color_value = $('.color_value')
      
  // Hides the color values if the user hid them on last session
  if (localStorage['hidden_values'] == "false")
    $color_value.hide();

  $(document).keydown(function(e){
    var pressed_key = String.fromCharCode(e.which)
    switch(pressed_key){
      // Hides the color values
      case 'H':
        var $color_value = $('.color_value')
        localStorage['hidden_values'] == "true"? $color_value.hide() : $color_value.show();
        localStorage['hidden_values'] = !(localStorage['hidden_values'] == "true");
        break;

      // Hides (or shows) the palette
      case 'E':
        handle_palette();
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