var $palette = $('#colors_palette'),
    paletteArray = localStorage['palette']? JSON.parse(localStorage['palette']):[]

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
  $scroller.scrollTop($scroller.scrollTop()+$palette.innerHeight());
  $scroller.css('top', $palette.innerHeight());
  $palette.show();
};

// Hides palette
////////////////
function hidePalette() {
  $scroller.scrollTop($scroller.scrollTop()-$palette.innerHeight());
  $scroller.css('top', 0);
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
    $('#chosen_colors').append(markupColor(object, false))
  };
  
// Save changes for the palette
///////////////////////////////
function savePalette() {
  localStorage['palette'] = JSON.stringify(paletteArray);
};
  
// Adds a color to the palette 
// and displays it (if hidden)
//////////////////////////////
function addToPalette(e) {
  var colorValueText = $(this).attr('rel');
  
  // Appends the color to the palette and saves its colorValue to the array
  $('#chosen_colors').prepend(markupColor(colorValueText, false))
  paletteArray.unshift(colorValueText);

  // Saves the state of the palette to the DB
  // NOTE: This _needs_ to be AFTER `paletteArray.push(colorValueText)`
  savePalette();

  // Shows the palette
  if (localStorage['palette_hidden'] == 'true') showPalette();
  localStorage['palette_hidden'] = false
};

// Removes item from palette
////////////////////////////
function removeFromPalette(e){
  paletteArray.splice(e.index(), 1)
  e.remove();

  // Saves the state of the palette to the DB
  // NOTE: This _needs_ to be AFTER `paletteArray.push(colorValueText)`
  savePalette();
};

// Clears palette
/////////////////
function clearPalette() {
  localStorage.removeItem('palette');
  paletteArray = []
  $('.color', $palette).remove();
};

$(function(){
  $('.addToPalette', $scroller).click(addToPalette);
  $('.removeFromPalette', $palette).live("click", function(){removeFromPalette($(this).parent())});
  $('#clear_palette').click(clearPalette);
});

$(window).resize(function() {
  localStorage['palette_hidden'] == "true" ? $scroller.css('top', 0):$scroller.css('top', $palette.innerHeight())
  $scroller.scroll(function(){
    localStorage.setItem('scrolled', localStorage['palette_hidden'] == "true" ? $(this).scrollTop() : $(this).scrollTop()-$palette.innerHeight())
  });
});

// $(document).keydown(function(e){
//   if (e.which == 27) hidePalette();
// });