define ['./goodies'], (_) ->
  setup: (options) ->
    _.listen _.id('colors'), 'click', (event) => 
      if event.target.classList.contains 'color'
        @selectColor event, options
    _.listen _.id('subjects'), 'click', (event) =>
      @removeColor event, options

  toggleMessage: (showTests) ->
    welcome_message = _.id 'welcome-message'
    color_tests = _.id 'tests'

    if showTests
      _.hide welcome_message
      _.show color_tests
    else
      _.show welcome_message
      _.hide color_tests

  selectColor: (event, options) ->
    clickedColor = event.target
    attribute = _.$getAttr.bind clickedColor
    color_subjects = _.id 'subjects'
    color_previews = _.cls 'color-preview'
    data =
      name: attribute 'data-name'
      hex: attribute 'data-hex'
      rgb: attribute 'data-rgb'
      hsl: attribute 'data-hsl'

    if color_previews.length > 0 and (event.metaKey or event.ctrlKey)
      if color_previews.length is 2
        _.remove color_previews[+!event.shiftKey]

      data.firstHex = _.attr color_previews[0], 'data-hex'
      colorTemplate = options.doubleTemplate
      previewsLength = 2
    else
      colorTemplate = options.singleTemplate
      previewsLength = 1

    _.attr color_subjects, 'data-subjects', previewsLength
    @toggleMessage true

    _.template options.previewTemplate, (template) ->
      cache = if previewsLength is 2 then color_subjects.innerHTML else ''
      color_subjects.innerHTML = cache + template data
    
    _.template colorTemplate, (template) ->
      _.id('tests').innerHTML = template data

  removeColor: (event, options) ->
    closeButton = event.target
    return unless closeButton.classList.contains 'close'

    previewsLength = _.cls('color-preview').length - 1
    _.attr _.id('subjects'), 'data-subjects', previewsLength, true
    _.remove closeButton.parentNode

    @toggleMessage previewsLength isnt 0

    preview = _.cls('color-preview')[0]
    return unless preview

    data =
      hex: _.attr preview, 'data-hex'

    _.template options.singleTemplate, (template) ->
      _.id('tests').innerHTML = template data
