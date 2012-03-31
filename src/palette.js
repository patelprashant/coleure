define(['./configs', './tooltip', './colors', './formats'], function(configs, tooltip, colors, formats){
  var dropText = configs.palette.selector.find('p');
  var paletteArray = localStorage.palette? JSON.parse(localStorage.palette):[]
  var _this = {
    checkQuantity: function(qty){
      dropText.hide();
      if(paletteArray.length==qty) dropText.show();
    },
    save: function(){
      localStorage.palette = JSON.stringify(paletteArray)
    },
    restore: function(){
      if (localStorage.palette)
        var paletteColors = JSON.parse(localStorage.palette);
            
      for (var color in paletteColors) {
        var object = paletteColors[color];
        configs.palette.selector.append(colors.markup(object))
      };
      
      _this.checkQuantity(0);
    },
    init: function(){
      _this.restore();
      
      configs.colors.placeholder.find('.color').on('dragstart', function(e){
        tooltip.dismiss();
        e.originalEvent.dataTransfer.effectAllowed = 'copy';
        e.originalEvent.dataTransfer.setData('Text', $(this).attr('data-hex'));
        
        configs.palette.dropzone.on('dragover', function (e) {
          if(paletteArray.length<=(configs.palette.limit-1)) {
            e.originalEvent.dataTransfer.dropEffect = 'copy'
          } else {
            e.originalEvent.dataTransfer.dropEffect = 'none'
          }
          return false;
          
        }).on('drop', function (e) {
          configs.palette.dropzone.off()
          var color = e.originalEvent.dataTransfer.getData('Text');
          
          if(paletteArray.length<=(configs.palette.limit-1)) {
            
            configs.palette.selector.append(colors.markup(color))
            
            _this.checkQuantity(-1);
          
            paletteArray.push(color);
            _this.save();
        
            formats.init('#palette > .color');
          }
          return false;
        });
      });
      
      configs.palette.selector.on('dragstart', '.color', function(e){
        configs.palette.dropzone.off();
        e.originalEvent.dataTransfer.effectAllowed = 'move';
        e.originalEvent.dataTransfer.setData('Text', $(this).index());
        configs.palette.trash.show();
      }).on('dragend', function(e){
        configs.palette.trash.hide();
      })
      
      configs.palette.trash.on('dragover', function(e){
        e.originalEvent.dataTransfer.dropEffect = 'move'
        return false;
      }).on('drop', function(e){
        var index = parseInt(e.originalEvent.dataTransfer.getData('Text'));
        paletteArray.splice(index-1,1);
        _this.checkQuantity(0);
        _this.save();
        configs.palette.selector.find('.color').eq(index-1).remove()
        $(this).hide();
        return false;
      })
    }
  }
  return _this;
});
