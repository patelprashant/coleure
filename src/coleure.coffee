#window.addEventListener 'load', -> if Opera support is wanted
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
      colorTemplate: 'templates/color.html'
      testTemplate: 'templates/test.html'
      singleTemplate: 'templates/test/single.html'