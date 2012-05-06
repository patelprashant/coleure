define ['./goodies'], (_) ->
  data = null
  colors = null
  colorTemplate = null

  colorDrag = (event) ->
    color = event.target
    data =
      name: _.attr color, 'data-name'
      hex: _.attr color, 'data-hex'
      rgb: _.attr color, 'data-rgb'
      hsl: _.attr color, 'data-hsl'

    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData 'text', 'Color added.'

  colorOver = (event) ->
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
    return false

  colorDrop = (event) ->
    #_.unlisten event.currentTarget, event.type, arguments.callee
    _.template colorTemplate, insertColor

    # TODO: make decent function, this is just for prototyping
    _.hide _.id 'drop-message'

  insertColor = (template) ->
    el = document.createElement 'i'
    colors.insertBefore el, colors.firstChild
    el.outerHTML = template data

  setup: (options) ->
    colors = _.id 'palette_colors'
    colorTemplate = options.template

    _.listen _.id('colors'), 'dragstart', colorDrag
    _.listen _.id('subjects'), 'dragstart', colorDrag

    dropzone = _.id 'palette'
    _.listen dropzone, 'dragover', colorOver
    _.listen dropzone, 'drop', colorDrop