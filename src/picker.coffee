define ['./_'], (_) ->
  setup: (options) ->
    _.listen _.id('colors'), 'click', (event) =>
      clickedColor = event.target

      _.template options.previewTemplate, (template) =>
        @displaySubject template: template color: clickedColor
      
      _.template options.singleTemplate, (template) =>
        @displayTests template: template color: clickedColor

  displaySubject: (options) ->
    element = options.color
    attribute = element.getAttribute.bind element
    color =
      name: attribute 'data-name'
      hex: attribute 'data-hex'

    _.id('subjects').innerHTML = options.template color

  displayTests: (options) ->
    color =
      hex: options.color.getAttribute 'data-hex'
    
    _.id('tests').innerHTML = options.template color