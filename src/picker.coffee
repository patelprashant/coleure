define ['./_'], (_) ->
  document.getElementById('colors').addEventListener 'click', (event) ->
    color = event.target
    colorValue = '#'+color.getAttribute('data-hex')
    colorName = ' '+color.getAttribute('data-name')

    info = document.getElementById('info')
    colorPreviews = info.getElementsByClassName('color-preview')
    messages = info.getElementsByClassName('message')
    
    colorPreview = colorPreviews[0]
    colorPreview.getElementsByClassName('color')[0].style.background = colorValue
    colorPreview.getElementsByTagName('h1')[0].lastChild.data = colorName

    _.forEach messages, (element) ->
      previousColor = element.style.color

      if previousColor is 'rgb(255, 255, 255)' or previousColor is 'rgb(0, 0, 0)'
        element.style.background = colorValue
      else
        element.style.color = colorValue