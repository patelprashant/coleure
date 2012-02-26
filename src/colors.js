define(['./configs','./pantone'], function (configs, pantone){
  return {
    markup: function(color) {
      return '<section class="'+configs.colors.dom+'" style="background: #'+color+'">'+color+'</section>';
    },
    init: function(){
      for (var color in pantone.colors) {
        pantone.colors[color]? 
          configs.colors.placeholder.append(this.markup(pantone.colors[color])):
          configs.colors.placeholder.append('<div class="empty-color" />')
      }
    }
  }
});