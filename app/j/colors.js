// The following returns R, G or B from HEX codes _without #_
function r(hex) { 
  return parseInt((hex).substring(0,2),16)
}
function g(hex) {
  return parseInt((hex).substring(2,4),16)
}
function b(hex) { 
  return parseInt((hex).substring(4,6),16)
}

// The following returns HSL from RGB
function hsl(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return [Math.floor(h * 360)+', '+Math.floor(s * 100)+'%, '+Math.floor(l * 100)+'%'];
}

function markup_color(e) {
  var rgb_for_object = r(e)+', '+g(e) +', '+b(e),
      hsl_for_object = hsl(r(e), g(e), b(e));
  return '<section class="color" style="background: #'+e+'"><header class="color_value" data-hex="'+e+'" data-rgb="'+rgb_for_object+'" data-hsl="'+hsl_for_object+'"></header></section>'
}

// Defining the placeholder where the colors will be loaded and
// of course, the colors.
var $placeholder = $('#scroller');

$(function(){
  for (var color in pantoneColors) {
    // Shortcut
    var object = pantoneColors[color];

    // If the object is `false` only an spacer will be loaded
    object? 
      $placeholder.append(markup_color(object)):
      $placeholder.append('<div class="color black-space" />');
  }
  
  if (localStorage['palette'])
    var db_palette = localStorage['palette'],
        chosen_colors = JSON.parse(db_palette)
    for (var color in chosen_colors) {
      var object = chosen_colors[color];
      $('#chosen_colors').append(markup_color(object))
    }
});