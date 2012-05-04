define ['./goodies'], (_) ->
  setup: (options) ->
    _.listen _.id('colors'), 'click', (event) => 
      if event.altKey
        @addColor event, options
      else
        @displayColor event, options
  subjects: 0
  displayColor: (event, options) ->
    clickedColor = event.target
    attribute = clickedColor.getAttribute.bind clickedColor
    data =
      name: attribute 'data-name'
      hex: attribute 'data-hex'
      
    _.template options.previewTemplate, (template) ->
      _.id('subjects').innerHTML = template data

    @subjects = 1
    _.id('subjects').setAttribute 'data-subjects', @subjects
    
    _.template options.singleTemplate, (template) ->
      _.id('tests').innerHTML = template data

  addColor: (event, options) ->
    clickedColor = event.target
    attribute = clickedColor.getAttribute.bind clickedColor
    
    data =
      name: attribute 'data-name'
      hex: attribute 'data-hex'
      firstHex: _.cls('color-preview')[0].getAttribute 'data-hex'

    @subjects++

    cache = _.id('subjects').innerHTML
    _.template options.previewTemplate, (template) ->
      _.id('subjects').innerHTML = cache + template data
    _.id('subjects').setAttribute 'data-subjects', @subjects
    
    _.template options.doubleTemplate, (template) ->
      _.id('tests').innerHTML = template data
