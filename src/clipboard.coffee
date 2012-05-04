define ['./keyboard', './settings', './goodies'], (keyboard, settings, _) ->

  selectColor = (color) ->
    clipboardHandler = _.id 'clipboard_handler'
    clipboardHandler.value = color.getAttribute('data-'+settings.format)
    clipboardHandler.select()

  _.listen _.id('colors'), 'mouseover', (event) ->
    selectColor event.target
  _.listen _.id('subjects'), 'mouseover', (event) ->
    selectColor event.target

  keyboard.listenWithCtrl 'C', ->
    clipboard = _.id('clipboard_handler').value
    document.title = "#{clipboard} - Coleure"
