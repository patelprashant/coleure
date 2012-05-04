define ['./keyboard', './settings', './goodies'], (keyboard, settings, _) ->

  colors_class = 'color'
  clipboard_handler = _.id 'clipboard_handler'
  selectColor = (color) ->
    clipboard_handler.value = color.getAttribute('data-'+settings.format)
    clipboard_handler.select()

  _.listen _.id('colors'), 'mouseover', (event) ->
    if event.target.classList.contains colors_class
      selectColor event.target
  _.listen _.id('subjects'), 'mouseover', (event) ->
    if event.target.classList.contains colors_class
      selectColor event.target

  keyboard.listenWithCtrl 'C', ->
    clipboard = clipboard_handler.value
    # TODO: Shouldn't execute when there's nothing on on _.id('clipboard_handler').value
    document.title = "#{clipboard} - Coleure"
