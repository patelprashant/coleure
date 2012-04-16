define ['./_'], (_) ->
  setup: (options) ->
    _.listen _.id('colors'), 'click', (event) =>
      _.async @, 'display', 3
      
      _.template options.previewTemplate, (template) =>
        @display previewTemplate: template
      
      _.template options.colorTemplate, (template) =>
        @display colorTemplate: template
      
      @display color: event.target

  display: (options) ->
    element = options.color
    attribute = element.getAttribute.bind element
    color =
      template: options.colorTemplate
      name: attribute 'data-name'
      hex: attribute 'data-hex'
      rgb: attribute 'data-rgb'
      hsl: attribute 'data-hsl'

    _.id('subjects').innerHTML = options.previewTemplate color