define ['./goodies'], (_) ->
  setup: (options) ->
    _.listen _.id('colors'), 'click', (event) => 
      if event.target.classList.contains('color') #check templates/color.html for more info
        @selectColor event, options
        @toggleMessage event, options
    _.listen _.id('subjects'), 'click', (event) =>
      @removeColor event, options
  
  subjects: 0

  toggleMessage: (event, options) ->
    welcome_message = _.id('welcome-message')
    color_tests = _.id('tests')
    if @subjects is 0
      _.show welcome_message
      _.hide color_tests
    else
      _.hide welcome_message
      _.show color_tests

  selectColor: (event, options) ->
    clickedColor = event.target
    attribute = clickedColor.getAttribute.bind clickedColor
    color_subjects = _.id('subjects')
    color_previews = _.cls('color-preview')
    color_tests = _.id('tests')
    data =
      name: attribute 'data-name'
      hex: attribute 'data-hex'
      rgb: attribute 'data-rgb'
      hsl: attribute 'data-hsl'

    if event.metaKey or event.ctrlKey
      addColor = (event) ->
        data.firstHex = color_previews[0].getAttribute 'data-hex'
        cache = color_subjects.innerHTML
        _.template options.previewTemplate, (template) ->
          color_subjects.innerHTML = cache + template data
      
        _.template options.doubleTemplate, (template) ->
          color_tests.innerHTML = template data

      if @subjects is 1
        addColor event
        @subjects = 2
        color_subjects.setAttribute 'data-subjects', @subjects
      else
        _.remove color_previews[0]
        addColor event
    else
      _.template options.previewTemplate, (template) ->
        color_subjects.innerHTML = template data

      @subjects = 1
      color_subjects.setAttribute 'data-subjects', @subjects
      
      _.template options.singleTemplate, (template) ->
        color_tests.innerHTML = template data

  removeColor: (event, options) ->
    closeButton = event.target
    if closeButton.classList.contains('close')
      _.remove closeButton.parentNode

      @subjects--
      _.id('subjects').setAttribute 'data-subjects', @subjects

      @toggleMessage event, options

      data =
        hex: _.cls('color-preview')[0].getAttribute('data-hex')

      _.template options.singleTemplate, (template) ->
        _.id('tests').innerHTML = template data
