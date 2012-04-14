define ['./_'], (_) ->
  load: (url) -> _.get url, (data) =>
    colors = JSON.parse data

    _.template 'templates/color.html', (colorTemplate) =>
      emptyColor = '<div class="item empty-color"></div>'
      placeholderContent = ''

      for color in colors
        placeholderContent += if color then colorTemplate color else emptyColor
      
      _.id('colors').innerHTML = placeholderContent