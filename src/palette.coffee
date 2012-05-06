define ['./goodies'], (_) ->
  setup: (options) ->
    dropzone = _.id 'palette'
    colors = _.id 'palette_colors'
    data = null

    _.listen _.id('colors'), 'dragstart', (event) ->
      color = event.target
      data =
        name: _.attr color, 'data-name'
        hex: _.attr color, 'data-hex'
        rgb: _.attr color, 'data-rgb'
        hsl: _.attr color, 'data-hsl'

      event.dataTransfer.effectAllowed = 'copy'
      event.dataTransfer.setData 'text', 'Color added.'

    _.listen dropzone, 'dragover', (event) ->
      event.preventDefault()
      event.dataTransfer.dropEffect = 'copy'
      return false

    _.listen dropzone, 'drop', (event) ->
      #_.unlisten event.currentTarget, event.type, arguments.callee
      _.template options.template, (template) ->
        el = document.createElement 'i'
        colors.appendChild el
        el.outerHTML = template data

      # TODO: make decent function, this is just for prototyping
      _.hide _.id 'drop-message'