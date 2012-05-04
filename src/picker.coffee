define ['./goodies'], (_) ->
  setup: (options) ->
    _.listen _.id('colors'), 'click', (event) => 
      if event.metaKey or event.ctrlKey
        @addColor event, options
      else
        @displayColor event, options
    _.listen _.id('subjects'), 'click', (event) =>
      @hideColor event, options
  
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

    cache = _.id('subjects').innerHTML
    _.template options.previewTemplate, (template) ->
      _.id('subjects').innerHTML = cache + template data

    @subjects++
    _.id('subjects').setAttribute 'data-subjects', @subjects
    
    _.template options.doubleTemplate, (template) ->
      _.id('tests').innerHTML = template data

  hideColor: (event, options) ->
    closeButton = event.target
    if closeButton.classList.contains('close')
      _.remove closeButton.parentNode

      @subjects--
      _.id('subjects').setAttribute 'data-subjects', @subjects

      data =
        hex: _.cls('color-preview')[0].getAttribute('data-hex')

      _.template options.singleTemplate, (template) ->
        _.id('tests').innerHTML = template data
