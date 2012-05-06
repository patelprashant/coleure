define ['./goodies'], (_) ->
  setup: (options) ->
    _.listen _.id('colors'), 'dragstart', (event) =>
      @setDropzone event, options

  setDropzone: (event, options) ->
    color = event.target
    dropzone = _.id('palette')
    colors = _.id('palette_colors')
    cache = colors.innerHTML

    data =
      name: _.attr color, 'data-name'
      hex: _.attr color, 'data-hex'
      rgb: _.attr color, 'data-rgb'
      hsl: _.attr color, 'data-hsl'

    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('text', 'Color added.')

    _.listen dropzone, 'dragover', (event) =>
      event.preventDefault()
      event.dataTransfer.dropEffect = 'copy'
      return false

    _.listen dropzone, 'drop', (event) =>
      _.template options.template, (template) ->
        colors.innerHTML = (template data) + cache

      # TODO: make decent function, this is just for prototyping
      _.hide _.id('drop-message')


