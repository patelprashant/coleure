define ['./settings', './_'], (settings, _) ->
  formats = document.getElementsByClassName('set-format')

  switchFormat = (event) =>
    newFormat = event.target
    settings.format = newFormat.getAttribute('id')
    
    _.forEach formats, (element) ->
      element.setAttribute 'data-state', 'inactive'
      
    newFormat.setAttribute 'data-state', 'active'
      
  _.forEach formats, (element) ->
    element.addEventListener 'click', switchFormat