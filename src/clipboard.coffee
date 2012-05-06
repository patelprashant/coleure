define ['./keyboard', './settings', './goodies'], (keyboard, settings, _) ->
  colors_class = 'color'
  clipboard_handler = _.id 'clipboard_handler'
  
  hoverColor = (color) ->
    _.attr clipboard_handler, 'data-hex', _.attr(color, 'data-hex')
    _.attr clipboard_handler, 'data-rgb', _.attr(color, 'data-rgb')
    _.attr clipboard_handler, 'data-hsl', _.attr(color, 'data-hsl')

    clipboard_handler.value = _.attr color, "data-#{settings.format}"
    clipboard_handler.select()

  verifyIfColor = (event) ->
    if event.target.classList.contains colors_class
      hoverColor event.target

  _.listen _.id('colors'), 'mouseover', verifyIfColor
  _.listen _.id('panels'), 'mouseover', verifyIfColor

  canvas = document.createElement 'canvas'
  canvas.height = canvas.width = 16
  ctx = canvas.getContext '2d'

  keyboard.listenWithCtrl 'C', ->
    clipboard = clipboard_handler.value
    return unless clipboard

    document.title = "#{clipboard} - Coleure"

    ctx.clearRect(0, 0, 16, 16)
    ctx.fillStyle = "#" + _.attr clipboard_handler, 'data-hex'
    ctx.beginPath()
    ctx.arc(8, 8, 8, 0, Math.PI*2, true)
    ctx.closePath()
    ctx.fill()

    link = document.createElement 'link'
    link.id = 'dynamic-favicon'
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = canvas.toDataURL 'image/x-icon'

    oldLink = _.id 'dynamic-favicon'

    head = document.head or _.tag('head')[0]
    if oldLink
      head.removeChild(oldLink);

    head.appendChild(link)