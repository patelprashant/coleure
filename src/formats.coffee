define ['./settings', './goodies'], (settings, _) ->
  formats = _.cls 'set-format'
  clipboard_handler = _.id 'clipboard_handler'
  switchFormat = (event) =>
    newFormat = event.target
    settings.format = newFormat.getAttribute('id')
    
    _.forEach formats, (element) ->
      element.setAttribute 'data-state', 'inactive'
      
    newFormat.setAttribute 'data-state', 'active'
    clipboard_handler.value = clipboard_handler.getAttribute('data-'+settings.format)
    clipboard_handler.select()
      
  _.forEach formats, (element) ->
    _.listen element, 'click', switchFormat
