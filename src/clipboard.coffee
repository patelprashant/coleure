define ['./keyboard'], (keyboard) ->
  document.getElementById('colors').addEventListener 'mouseover', (event) ->
    clipboardHandler = document.getElementById('clipboard_handler')
    clipboardHandler.value = event.target.getAttribute('data-hex')
    clipboardHandler.select()

  keyboard.listenWithCtrl 'C', ->
    clipboard = document.getElementById('clipboard_handler').value
    document.title = "#{clipboard} - Coleure"