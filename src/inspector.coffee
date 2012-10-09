define ['./goodies'], (_) ->
  color_subjects = null
  options = null
  data = null

  toggleMessage = (showTests) ->
    welcome_message = _.id 'welcome-message'
    color_tests = _.id 'tests'

    if showTests
      _.hide welcome_message
      _.show color_tests
    else
      _.show welcome_message
      _.hide color_tests

  changePreview = (template) ->
    color_subjects.innerHTML += template data

  changeTests = (template) ->
    _.id('tests').innerHTML = template data

  removeColor = (event) ->
    closeButton = event.target
    return unless closeButton.classList.contains 'close'

    previewsLength = _.cls('color-preview').length - 1
    _.attr _.id('subjects'), 'data-subjects', previewsLength, true
    _.remove closeButton.parentNode

    toggleMessage previewsLength isnt 0

    preview = _.cls('color-preview')[0]
    return unless preview

    data =
      hex: _.attr preview, 'data-hex'

    _.template options.singleTemplate, changeTests

  selectColor: (event) ->
    clickedColor = event.target
    return unless clickedColor.classList.contains 'color'
    attribute = clickedColor.getAttribute.bind clickedColor
    color_previews = _.cls 'color-preview'
    data =
      name: attribute 'data-name'
      hex: attribute 'data-hex'
      rgb: attribute 'data-rgb'
      hsl: attribute 'data-hsl'

    if color_previews.length > 0 and (event.altKey)
      if color_previews.length is 2
        _.remove color_previews[+!event.shiftKey]

      data.firstHex = _.attr color_previews[0], 'data-hex'
      colorTemplate = options.doubleTemplate
      previewsLength = 2
    else
      length = color_previews.length
      while length-- > 0
        _.remove color_previews[0]
      colorTemplate = options.singleTemplate
      previewsLength = 1

    _.attr color_subjects, 'data-subjects', previewsLength
    toggleMessage true

    _.template options.previewTemplate, changePreview
    _.template colorTemplate, changeTests

  setup: ($options) ->
    options = $options
    color_subjects = _.id 'subjects'
    
    _.listen _.id('colors'), 'click', this.selectColor
    _.listen _.id('palette_colors'), 'click', this.selectColor
    _.listen _.id('subjects'), 'click', removeColor

    # prevents Chrome to show Console while copying color and pressing alt
    _.listen 'keydown', (event) ->
      if event.altKey
        event.preventDefault()