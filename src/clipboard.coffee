define ['./keyboard', './settings'], (keyboard, settings) ->
  document.getElementById('colors').addEventListener 'mouseover', (event) ->
    clipboardHandler = document.getElementById('clipboard_handler')
    clipboardHandler.value = event.target.getAttribute('data-'+settings.format)
    clipboardHandler.select()

  keyboard.listenWithCtrl 'C', ->
    clipboard = document.getElementById('clipboard_handler').value
    document.title = "#{clipboard} - Coleure"