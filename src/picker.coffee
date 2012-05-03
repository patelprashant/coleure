define ['./goodies'], (_) ->
  setup: (options) ->
    _.listen _.id('colors'), 'click', (event) => @displayColor event, options

  displayColor: (event, options) ->
    clickedColor = event.target
    attribute = clickedColor.getAttribute.bind clickedColor
    data =
      name: attribute 'data-name'
      hex: attribute 'data-hex'

    _.template options.previewTemplate, (template) ->
      _.id('subjects').innerHTML = template data
    
    _.template options.singleTemplate, (template) ->
      _.id('tests').innerHTML = template data
