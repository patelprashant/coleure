#window.addEventListener 'load', -> if Opera support is wanted
require ['./colors', './clipboard', './formats', './picker'], (colors) ->
  "use strict"
  colors.load
    colors: 'src/pantone.json'
    template: 'templates/color.html'