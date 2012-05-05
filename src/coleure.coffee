window.addEventListener 'load', ->
  require [
    './colors'
    './picker'
    './clipboard'
    './formats'],
    (colors, picker) ->
      
      "use strict"

      colors.load
        colors: 'src/pantone.json'
        template: 'templates/color.html'

      picker.setup
        previewTemplate: 'templates/preview.html'
        singleTemplate: 'templates/test/single.html'
        doubleTemplate: 'templates/test/double.html'