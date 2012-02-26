define(['./settings','./pantone'], function (settings, pantone){
  var markupColor = function (color) {
    return  '<section class="color" style="background: #'+color+'">'+
              '<header class="value" style="display: none;" />'+
            '</section>';
  };
  return {
    list: function(){
      for (var color in pantone.colors) {
        pantone.colors[color]? 
          settings.colors.placeholder.before(markupColor(color)):
          settings.colors.placeholder.before('<div class="empty-color" />')
      }
    }
  }
});