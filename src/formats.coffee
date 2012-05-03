define ['./settings', './goodies'], (settings, _) ->
  formats = _.cls 'set-format'

  switchFormat = (event) =>
    newFormat = event.target
    settings.format = newFormat.getAttribute('id')
    
    _.forEach formats, (element) ->
      element.setAttribute 'data-state', 'inactive'
      
    newFormat.setAttribute 'data-state', 'active'
      
  _.forEach formats, (element) ->
    _.listen element, 'click', switchFormat
