define ['./_'], (_) ->
  load: (sources) ->
    _.async @, 'display', 2
    _.json sources.colors, (colors) => @display colors: colors
    _.template sources.template, (template) => @display template: template
  
  display: (settings) ->
    colors = settings.colors
    template = settings.template
    content = ''
    content += template color for color in colors
    _.id('colors').innerHTML = content