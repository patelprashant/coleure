define ->

  #Straightforward XHR

  get: (url, handler) ->
    request = new XMLHttpRequest()
    request.open 'GET', url
    request.addEventListener 'readystatechange', (event) ->
      if request.readyState is 4 and request.status is 200
        event.target.removeEventListener(event.type, arguments.callee)
        handler(request.responseText)
    request.send()

  #For pseudo-Array collections

  $forEach: Array.prototype.forEach
  forEach: (formats, handler) -> @$forEach.call(formats, handler)