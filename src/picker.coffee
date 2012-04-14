define ['./_'], (_) ->
  _.listen _.id('colors'), 'click', (event) ->
    color = event.target
    colorValue = '#' + color.getAttribute 'data-hex'
    colorName = color.getAttribute 'data-name'

    info = _.id 'info'
    colorPreviews = _.cls info, 'color-preview'
    messages = _.cls info, 'log'
    
    colorPreview = colorPreviews[0]
    _.cls(colorPreview, 'color')[0].style.background = colorValue
    _.tag(colorPreview, 'h1')[0].lastChild.data = colorName

    _.forEach messages, (element) ->
      previousColor = element.style.color

      if previousColor is 'rgb(255, 255, 255)' or 
         previousColor is 'rgb(0, 0, 0)'
        element.style.background = colorValue
      else
        element.style.color = colorValue
