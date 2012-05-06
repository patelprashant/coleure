define ['./goodies'], (_) ->
  _display: (settings) ->
    colors = settings.colors
    template = settings.template
    content = ''
    content += template color for color in colors
    _.id('colors').innerHTML = content
  
  load: (sources) ->
    _.async @, '_display', 2
    _.json sources.colors, (colors) => @_display colors: colors
    _.template sources.template, (template) => @_display template: template