define ->
  singleKeys = []
  singleFunctions = []
  
  combinedKeys = []
  combinedFunctions = []
  
  document.addEventListener 'keydown', (event) ->
    key = String.fromCharCode(event.which)

    index = singleKeys.indexOf(key)
    if index isnt -1 then singleFunctions[index]()

    if event.metaKey or event.ctrlKey
      index = combinedKeys.indexOf(key)
      if index isnt -1 then combinedFunctions[index]()

  listen: (key, fn) ->
    length = singleKeys.length
    singleKeys[length] = key
    singleFunctions[length] = fn
  listenWithCtrl: (key, fn) ->
    length = combinedKeys.length
    combinedKeys[length] = key
    combinedFunctions[length] = fn