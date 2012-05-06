window.addEventListener 'load', ->
  require [
    './colors'
    './inspector'
    './palette'
    './clipboard'
    './formats'],
    (colors, inspector, palette) ->
      
      "use strict"

      colors.load
        colors: 'src/pantone.json'
        template: 'templates/color.html'

      inspector
        previewTemplate: 'templates/preview.html'
        singleTemplate: 'templates/test/single.html'
        doubleTemplate: 'templates/test/double.html'

      palette
        template: 'templates/color.html'