var $palette = $('#colors_palette'),
    $body = $('body');

// Toggle palette
/////////////////
function togglePalette() {
  localStorage['palette_hidden'] == "true"? showPalette() : hidePalette();
  localStorage['palette_hidden'] = !(localStorage['palette_hidden'] == "true");
};
addOption({name:'Palette', shortcut: 'E', run: togglePalette});

// Shows palette
////////////////
function showPalette() {
  if ($(window).width() >= 1400){
    $body.addClass('palette-shown');
  } else {
    $('.scroller').scrollTop($('.scroller').scrollTop()+$palette.innerHeight());
    $('.scroller').css('top', $palette.innerHeight());
  };
  $palette.show();
};

// Hides palette
////////////////
function hidePalette() {
  if ($(window).width() >= 1400){
    $body.removeClass('palette-shown');
  } else {
    $('.scroller').scrollTop($('.scroller').scrollTop()-$palette.innerHeight());
    $('.scroller').css('top', 0);
  }
  $palette.hide();
};

// Restores visibility of palette
/////////////////////////////////
if (localStorage['palette_hidden']) {
  localStorage['palette_hidden'] == "false" ? showPalette() : hidePalette();
} else {
  localStorage.setItem('palette_hidden', true);
  hidePalette();
};
  
// Restores palette colors
//////////////////////////
if (localStorage['palette'])
  var paletteDB = localStorage['palette'],
      paletteColors = JSON.parse(paletteDB);
  for (var color in paletteColors) {
    var object = paletteColors[color];
    $('#chosen_colors').append(markupColor(object))
  };

$(function(){  
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
        selectColor
      ).click(
        remove_from_palette
      );
    palette_array.unshift(color_value_text)

    // Saves the state of the palette to the DB
    // NOTE: This _needs_ to be AFTER `palette_array.push(color_value_text)`
    localStorage['palette'] = JSON.stringify(palette_array)

    // Shows the palette
    if (localStorage['palette_hidden'] == 'true') showPalette();
    localStorage['palette_hidden'] = false
  });
    
  // Removes item from palette (db, not visually)
  function remove_from_palette(){
    palette_array.splice($(this).index(), 1)
    $(this).remove();

    // Saves the state of the palette to the DB
    // NOTE: This _needs_ to be AFTER `palette_array.push(color_value_text)`
    localStorage['palette'] = JSON.stringify(palette_array)
  };
  $('#chosen_colors .color').click(remove_from_palette);
  
  // Clears palette
  function clear_palette() {
    localStorage.removeItem('palette');
    palette_array = []
    $('#chosen_colors .color').remove();
  }
  $('#clear_palette').click(function(){clear_palette();});
  $('#show_palette').click(function(){togglePalette();});
});