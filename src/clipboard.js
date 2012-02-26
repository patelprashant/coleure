define(['./configs','./keyboard','./colors'], function(configs, keyboard){
  
  function selectColor(){
    configs.clipboard.field.val($(this).text()).select();
  }
  
  function currentColorToTitle () {
    $('title').text(configs.clipboard.field.val()+' - '+configs.app.name);
  }
  
  return {
    init: function(){
      configs.colors.selector.live('mouseover', selectColor);
      keyboard.combined('C', currentColorToTitle);
    }
  }
  
});