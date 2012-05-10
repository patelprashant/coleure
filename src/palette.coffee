define ['./goodies', './settings'], (_, settings) ->
  #Transfer
  data = null

  #Elements
  colors = null
  palettesList = null
  paletteItems = null
  palettesDropdownLabel = null
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
    event.dataTransfer.setData 'text', 'Color added.'

  colorOver = (event) ->
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'

  colorDrop = (event) ->
    event.preventDefault()
    
    # TODO: make decent function, this is just for prototyping
    _.template colorTemplate, insertColor
    _.hide dropMessage
    activePalette.push data

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
      
      switchPalette clickedElement

  createPalette = (name) ->
    newPalette = _.create 'li'
    palettesList.appendChild newPalette
    newPalette.outerHTML = 
      """<li class='select-option'>
        <span class='name-option'>#{name}</span>
        <a class='remove-option right'>&times;</a>
      </li>"""

    switchPalette paletteItems[paletteItems.length - 1]

  switchPalette = (palette) ->
    index = _.indexOf paletteItems, palette

    return unless settings.activePaletteIndex isnt index
    
    previousPalette = paletteItems[settings.activePaletteIndex]
    if previousPalette then previousPalette.classList.remove 'selected'
    palette.classList.add 'selected'

    settings.activePaletteIndex = index
    activePalette = settings.palettes[index] or= []

    palettesDropdownLabel.innerHTML = _.cls(palette, 'name-option')[0].innerHTML
    _.template colorTemplate, replaceColors

  replaceColors = (template) ->
    while colors.firstChild
      colors.removeChild colors.firstChild

    for color in activePalette
      data = color
      insertColor template

    if colors.children.length
      _.hide dropMessage
    else
      _.show dropMessage

  removePalette = (element) ->
    index = _.indexOf paletteItems, element
    settings.palettes.splice index, 1
    _.remove element

  #Shared methods
  insertColor = (template) ->
    el = _.create 'i'
    colors.insertBefore el, colors.firstChild
    el.outerHTML = template data

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

    #Set private variables
    dropMessage = _.id 'drop-message'
    colors = _.id 'palette_colors'
    colorTemplate = options.template

    #Apply defaults
    createPalette 'Default' unless paletteItems.length