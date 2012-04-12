define ['./_'], (_) ->
  load: (url) -> _.get url, (data) =>
    colors = JSON.parse data
    placeholderContent = ''
    emptyColor = '<div class="item empty-color"></div>'
    getColor = (color) ->
      '<i
        draggable="true"
        class="item color"
        data-name="'+color.name+'"
        data-hex="'+color.hex+'"
        data-rgb="'+color.rgb+'"
        data-hsl="'+color.hsl+'"
        style="background: #'+color.hex+'">
      </i>'

    for color in colors
      placeholderContent += if color then getColor color else emptyColor

    _.id('colors').innerHTML = placeholderContent