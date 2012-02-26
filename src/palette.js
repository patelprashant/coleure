define(['./configs', './tooltip', './colors', './formats'], function(configs, tooltip, colors, formats){
  var dropText = configs.palette.selector.find('p');
  var paletteArray = localStorage.palette? JSON.parse(localStorage.palette):[]
  var _this = {
    checkQuantity: function(qty){
      if(paletteArray.length>=qty) dropText.hide();
    },
    save: function(){
      localStorage.palette = JSON.stringify(paletteArray)
    }, 
    makeDraggable: function(query){
      query.attr('draggable', true)
    },
    restore: function(){
      if (localStorage.palette)
        var paletteColors = JSON.parse(localStorage.palette);
            
      for (var color in paletteColors) {
        var object = paletteColors[color];
        configs.palette.selector.append(colors.markup(object))
      };
      
      _this.checkQuantity(1);
    },
    init: function(){
      _this.restore();
      
      $('#palette > .color').on('click', function(){
        var index = $(this).index();
        $(this).remove()
        paletteArray.splice(index,0);
        console.log(paletteArray);
      });
      
      var $bodyColors = $('body > .color');
      
      $bodyColors.attr('draggable', true);
      
      $bodyColors.on('dragstart', function(e){
        tooltip.dismiss();
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('Color', $(this).attr('data-hex'));
      });
      
      configs.palette.dropzone.on('dragover', function (e) {
        if (e.preventDefault) e.preventDefault(); // allows us to drop
        if(paletteArray.length<=(configs.palette.limit-1)) { 
          e.dataTransfer.dropEffect = 'copy'
        } else {
          e.dataTransfer.dropEffect = 'none'
        }
        return false;
      });
      
      configs.palette.dropzone.on('drop', function (e) {
        var color = e.dataTransfer.getData('Color');
        
        if(paletteArray.length<=(configs.palette.limit-1))
          configs.palette.selector.append(colors.markup(color))
      
        _this.checkQuantity(0);
      
        paletteArray.push(color);
        // _this.save();
        
        console.log(paletteArray)
        
        return false;
      });
    }
  }
  return _this;
});