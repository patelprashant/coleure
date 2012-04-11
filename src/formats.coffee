define ['./settings'], (settings) ->
  switchFormat = (event) =>
    settings.format = event.target.getAttribute('id').substr(2).toLowerCase()

  document.getElementById('toHEX').addEventListener('click', switchFormat)
  document.getElementById('toRGB').addEventListener('click', switchFormat)
  document.getElementById('toHSL').addEventListener('click', switchFormat)