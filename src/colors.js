define(['./configs','./pantone'], function (configs, pantone){
  return {
    markup: function(color, name) {
      return '<section draggable="true" class="item '+configs.colors.dom+'" style="background: #'+color+'">'+color+'</section>';
    },
    init: function(){
      for (var color in pantone.colors) {
        pantone.colors[color]? 
          configs.colors.placeholder.append(this.markup(pantone.colors[color], pantone.names[color])):
          configs.colors.placeholder.append('<div class="item empty-color" />')
      }
    }
  }
});
