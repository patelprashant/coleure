define ['./settings'], (settings) ->
  forEach = Array.prototype.forEach
  formats = document.getElementsByClassName('set-format')
  
  switchFormat = (event) =>
    settings.format = event.target.getAttribute('id')
    
    forEach.call formats, (el) ->
      el.setAttribute 'data-state', 'inactive'
      
    event.target.setAttribute 'data-state', 'active'
      
  forEach.call formats, (el) ->
    el.addEventListener 'click', switchFormat
