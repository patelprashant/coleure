define ['./goodies', './settings'], (_, settings) ->
  data = null
  colors = null
  colorTemplate = null
  dropdown = null
  paletteColors = null

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
    paletteColors.push data

  insertColor = (template) ->
    el = document.createElement 'i'
    colors.insertBefore el, colors.firstChild
    el.outerHTML = template data

  replaceColors = (template) ->
    while colors.firstChild
      colors.removeChild colors.firstChild

    for color in paletteColors
      data = color
      insertColor template

  changePalette = (event) ->
    palette = event.target
    return unless palette.classList.contains 'select-option'
    
    index = _.indexOf _.tag(dropdown, 'li'), palette
    settings.currentPalette = index
    paletteColors = settings.palettes[index] or= []
    
    _.template colorTemplate, replaceColors

  addPalette = (event) ->
    field = event.target
    el = _.create 'li'
    dropdown.appendChild el
    el.outerHTML = "<li class='select-option'>#{field.value}</li>"
    field.value = ''

  setup = (options) ->
    selectOptions = _.cls('select-options')[0]

    dropdown = _.tag(selectOptions, 'ul')[0]
    _.listen dropdown, 'click', changePalette

    newPaletteField = _.tag(selectOptions, 'input')[0]
    _.listen newPaletteField, 'change', addPalette

    dropzone = _.id 'palette'
    _.listen dropzone, 'dragenter', colorOver
    _.listen dropzone, 'dragover', colorOver
    _.listen dropzone, 'drop', colorDrop

    _.listen _.id('colors'), 'dragstart', colorDrag
    _.listen _.id('subjects'), 'dragstart', colorDrag

    colors = _.id 'palette_colors'
    colorTemplate = options.template
    paletteColors = settings.palettes[settings.currentPalette]