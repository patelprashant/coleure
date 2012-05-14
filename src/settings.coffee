define ['./goodies'], (_) ->
  _.listen window, 'unload', (event) ->
    localStorage['settings'] = JSON.stringify data

  if dataString = localStorage['settings']
    return data = JSON.parse dataString
  
  data = 
    format: 'hex'
    activePaletteIndex: 0
    palettes: [name:'Default', colors:[]]