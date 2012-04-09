#require ['./configs'], (configs) ->
require ['./colors', './clipboard'], (colors, clipboard) ->
  "use strict"
  colors.load('src/pantone.json')