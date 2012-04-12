define ['./keyboard', './settings', './_'], (keyboard, settings, _) ->
  _.listen _.id('colors'), 'mouseover', (event) ->
    clipboardHandler = _.id 'clipboard_handler'
    clipboardHandler.value = event.target.getAttribute('data-'+settings.format)
    clipboardHandler.select()

  keyboard.listenWithCtrl 'C', ->
    clipboard = _.id('clipboard_handler').value
    document.title = "#{clipboard} - Coleure"