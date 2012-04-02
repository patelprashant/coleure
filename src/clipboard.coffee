define ['./configs','./keyboard','./colors'], (configs, keyboard) ->
  selectColor = ->
    configs.clipboard.field.val($(this).text()).select()
  
  currentColorToTitle = ->
    $('title').text(configs.clipboard.field.val()+' - '+configs.app.name)
  
  init: ->
    configs.colors.selector.live('mouseover', selectColor)
    keyboard.combined('C', currentColorToTitle)