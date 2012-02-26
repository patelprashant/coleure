var colorValue = 'value';

////////////////
// RGB functions
////////////////
function r(hex) { 
  return parseInt((hex).substring(0,2),16);
};
function g(hex) {
  return parseInt((hex).substring(2,4),16);
};
function b(hex) { 
  return parseInt((hex).substring(4,6),16);
};

////////////////
// HSL functions
////////////////
function HSLFromRGB(r, g, b){
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
      };
      h /= 6;
  };

  return [Math.floor(h * 360)+', '+Math.floor(s * 100)+'%, '+Math.floor(l * 100)+'%'];
};

function markupColor(e, paletteSwitch) {
  var returnRGB = r(e)+', '+g(e) +', '+b(e),
      returnHSL = HSLFromRGB(r(e), g(e), b(e)),
      colorLink;
  
  paletteSwitch?
    colorLink = '<a class="addToPalette" href="javascript:;" rel="'+e+'">+</a>':
    colorLink = '<a class="removeFromPalette" href="javascript:;" rel="'+e+'">&times;</a>'
    
  return  '<section class="color" style="background: #'+e+'">'+colorLink+
            '<header class="'+colorValue+'" data-hex="'+e+'" data-rgb="'+returnRGB+'" data-hsl="'+returnHSL+'" style="display: none;" />'+
          '</section>';
};

// Defining the placeholder where the colors will be loaded and
// of course, the colors.
$(function(){
  var $colorsPlaceholder = $('footer.site');
  for (var pantoneColor in pantoneColors) {
    // Shortcut
    var color = pantoneColors[pantoneColor];

    // If the object is `false` only an spacer will be loaded
    color? 
      $colorsPlaceholder.before(markupColor(color, true)):
      $colorsPlaceholder.before('<div class="empty-color" />');
  };
});