define ['./settings', './goodies'], (settings, _) ->
  formats = _.cls 'set-format'
  clipboardHandler = _.id 'clipboard_handler'

  _.attr _.id('hex'), 'data-state', 'active'

  switchFormat = (event) ->
    newFormat = event.target
    settings.format = _.attr newFormat, 'id'
    
    _.forEach formats, (element) ->
      _.attr element, 'data-state', 'inactive'
      
    _.attr newFormat, 'data-state', 'active'
    clipboardHandler.value = _.attr clipboardHandler, "data-#{settings.format}"
    clipboardHandler.select()
      
  _.forEach formats, (element) ->
    _.listen element, 'click', switchFormat