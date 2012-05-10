define ['./goodies', './settings'], (_, settings) ->
  #Transfer
  data = null

  #Elements
  colors = null
  palettesList = null
  paletteItems = null

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
    _.hide _.id 'drop-message'
    activePalette.push data

  #Palettes

  newPaletteField_changeHandler = (event) ->
    field = event.target
    createPalette field.value
    field.value = ''

  palettesList_clickHandler = (event) ->
    clickedElement = event.target

    if clickedElement.classList.contains 'select-option'
      switchPalette clickedElement
    else if clickedElement.classList.contains 'remove-palette'
      removePalette clickedElement.parentNode

  createPalette = (name) ->
    newPalette = _.create 'li'
    palettesList.appendChild newPalette
    newPalette.outerHTML = 
      """<li class='select-option'>
        #{name}
        <a class='remove-palette right'>&times;</a>
      </li>"""

  switchPalette = (element) ->
    index = _.indexOf paletteItems, element

    return unless settings.activePaletteIndex isnt index
    settings.activePaletteIndex = index
    activePalette = settings.palettes[index] or= []
    
    _.template colorTemplate, replaceColors

  replaceColors = (template) ->
    while colors.firstChild
      colors.removeChild colors.firstChild

    for color in activePalette
      data = color
      insertColor template

  removePalette = (element) ->
    index = _.indexOf paletteItems, element
    settings.palettes.splice index, 1
    _.remove element

  #Shared methods

  insertColor = (template) ->
    el = document.createElement 'i'
    colors.insertBefore el, colors.firstChild
    el.outerHTML = template data

  #Setup

  setup = (options) ->
    selectOptions = _.cls('select-options')[0]

    palettesList = _.tag(selectOptions, 'ul')[0]
    _.listen palettesList, 'click', palettesList_clickHandler

    paletteItems = _.tag palettesList, 'li'

    createPalette 'Default' unless paletteItems.length

    newPaletteField = _.tag(selectOptions, 'input')[0]
    _.listen newPaletteField, 'change', newPaletteField_changeHandler

    dropzone = _.id 'palette'
    _.listen dropzone, 'dragenter', colorOver
    _.listen dropzone, 'dragover', colorOver
    _.listen dropzone, 'drop', colorDrop

    _.listen _.id('colors'), 'dragstart', colorDrag
    _.listen _.id('subjects'), 'dragstart', colorDrag

    colors = _.id 'palette_colors'
    colorTemplate = options.template
    activePalette = settings.palettes[settings.activePaletteIndex]