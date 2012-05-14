define ['./goodies', './settings'], (_, settings) ->
  #Elements
  palettesDropdownLabel = null
  palettesList = null
  paletteItems = null
  paletteColors = null
  dropMessage = null

  #Options
  colorTemplate = null

  #Settings
  activePalette = null

  #Colors DnD

  colorDrag = (event) ->
    color = event.target
    data =
      name: _.attr color, 'data-name'
      hex: _.attr color, 'data-hex'
      rgb: _.attr color, 'data-rgb'
      hsl: _.attr color, 'data-hsl'

    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData 'text', JSON.stringify(data)

  colorOver = (event) ->
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'

  colorDrop = (event) ->
    event.preventDefault()
    
    # TODO: make decent function, this is just for prototyping
    data = JSON.parse event.dataTransfer.getData 'text'

    _.template colorTemplate, (template) ->
      insertColor template, data

    _.hide dropMessage
    activePalette.push data

  #Palette color removal

  paletteColorDrag = (event) ->
    event.dataTransfer.effectAllowed = 'move'

    paletteColor = event.target
    index = _.indexOf paletteColor.parentNode.children, paletteColor

    event.dataTransfer.setData 'text', index

  paletteColorOver = (event) ->
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'

  paletteColorDrop = (event) ->
    event.preventDefault()

    index = event.dataTransfer.getData 'text'
    _.remove paletteColors.children.item(index)
    activePalette.splice(activePalette.length - index - 1, 1)

  #Palettes

  newPaletteField_changeHandler = (event) ->
    field = event.target
    createPalette field.value
    field.value = ''

  palettesList_clickHandler = (event) ->
    clickedElement = event.target

    if clickedElement.classList.contains 'remove-option'
      removePalette clickedElement.parentNode
    else
      unless clickedElement.classList.contains 'select-option'
        clickedElement = clickedElement.parentNode
      
      switchPalette _.indexOf(paletteItems, clickedElement)

  createPalette = (name) ->
    settings.palettes.push 
      name: name
      colors: []

    addPalette name
    switchPalette paletteItems.length-1

  addPalette = (name) ->
    newPalette = _.create 'li'
    palettesList.appendChild newPalette
    newPalette.outerHTML = 
      """<li class='select-option'>
        <span class='name-option'>#{name}</span>
        <a class='remove-option right'>&times;</a>
      </li>"""

  switchPalette = (index) ->
    return unless settings.activePaletteIndex isnt index
    
    previousPalette = paletteItems[settings.activePaletteIndex]
    if previousPalette then previousPalette.classList.remove 'selected'

    palette = paletteItems[index]
    palette.classList.add 'selected'

    settings.activePaletteIndex = index
    activePalette = settings.palettes[index].colors
    console.log settings.palettes[index]

    palettesDropdownLabel.innerHTML = _.cls(palette, 'name-option')[0].innerHTML
    _.template colorTemplate, replaceColors

  replaceColors = (template) ->
    while paletteColors.firstChild
      paletteColors.removeChild paletteColors.firstChild

    for color in activePalette
      insertColor template, color

    if paletteColors.children.length
      _.hide dropMessage
    else
      _.show dropMessage

  removePalette = (element) ->
    index = _.indexOf paletteItems, element
    settings.palettes.splice index, 1
    _.remove element

  #Shared methods
  insertColor = (template, color) ->
    el = _.create 'i'
    paletteColors.insertBefore el, paletteColors.firstChild
    el.outerHTML = template color

  #Setup
  setup = (options) ->
    #Palettes listeners
    palettesDropdown = _.cls('select-options')[0]
    palettesDropdownLabel = _.cls('select-input')[0]

    palettesList = _.tag(palettesDropdown, 'ul')[0]
    _.listen palettesList, 'click', palettesList_clickHandler

    paletteItems = palettesList.children

    newPaletteField = _.tag(palettesDropdown, 'input')[0]
    _.listen newPaletteField, 'change', newPaletteField_changeHandler

    #Colors DnD listeners
    dropzone = _.id 'palette'
    _.listen dropzone, 'dragenter', colorOver
    _.listen dropzone, 'dragover', colorOver
    _.listen dropzone, 'drop', colorDrop

    _.listen _.id('colors'), 'dragstart', colorDrag
    _.listen _.id('subjects'), 'dragstart', colorDrag

    paletteColors = _.id 'palette_colors'
    _.listen paletteColors, 'dragstart', paletteColorDrag
    _.listen _.id('colors'), 'dragenter', paletteColorOver
    _.listen _.id('colors'), 'dragover', paletteColorOver
    _.listen _.id('colors'), 'drop', paletteColorDrop

    #Set private variables
    dropMessage = _.id 'drop-message'
    colorTemplate = options.template

    #Load settings
    for palette in settings.palettes
      addPalette palette.name

    activePaletteIndex = settings.activePaletteIndex
    settings.activePaletteIndex = -1

    switchPalette activePaletteIndex