define ->
  load: (url) ->
    @get url, (data) =>
      colors = JSON.parse(data)
      placeholderContent = ''
      emptyColor = '<div class="item empty-color"></div>'
      getColor = (color) ->
        '<i
          draggable="true"
          class="item color"
          data-hex="'+color.hex+'"
          data-rgb="'+color.rgb+'"
          data-hsl="'+color.hsl+'"
          style="background: #'+color.hex+'">
        </i>'

      for color in colors
        placeholderContent += if color then getColor(color) else emptyColor

      document.getElementById('colors').innerHTML = placeholderContent

  get: (url, handler) ->
    request = new XMLHttpRequest()
    request.open 'GET', url
    request.addEventListener 'readystatechange', (event) ->
      if request.readyState is 4 and request.status is 200
        event.target.removeEventListener(event.type, arguments.callee)
        handler(request.responseText)
    request.send()