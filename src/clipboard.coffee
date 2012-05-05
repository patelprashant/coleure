define ['./keyboard', './settings', './goodies'], (keyboard, settings, _) ->

  colors_class = 'color'
  clipboard_handler = _.id 'clipboard_handler'
  
  hoverColor = (color) ->
    clipboard_handler.setAttribute 'data-hex', color.getAttribute 'data-hex'
    clipboard_handler.setAttribute 'data-rgb', color.getAttribute 'data-rgb'
    clipboard_handler.setAttribute 'data-hsl', color.getAttribute 'data-hsl'
    clipboard_handler.value = color.getAttribute "data-#{settings.format}"
    clipboard_handler.select()

  verifyIfColor = (event) ->
    if event.target.classList.contains colors_class
      hoverColor event.target

  _.listen _.id('colors'), 'mouseover', verifyIfColor
  _.listen _.id('subjects'), 'mouseover', verifyIfColor

  canvas = document.createElement 'canvas'
  canvas.height = canvas.width = 16
  ctx = canvas.getContext '2d'

  keyboard.listenWithCtrl 'C', ->
    # TODO: Shouldn't execute when there's nothing on on _.id('clipboard_handler').value
    clipboard = clipboard_handler.value
    return unless clipboard

    document.title = "#{clipboard} - Coleure"

    ctx.clearRect(0, 0, 16, 16)
    ctx.fillStyle = "#" + clipboard_handler.getAttribute 'data-hex'
    ctx.beginPath()
    ctx.arc(8, 8, 8, 0, Math.PI*2, true)
    ctx.closePath()
    ctx.fill()

    _.id('dynamic-favicon').href = canvas.toDataURL 'image/png'