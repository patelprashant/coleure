define ['./configs', './tooltip', './colors', './formats'], (configs, tooltip, colors, formats) ->
  dropText = configs.palette.selector.find('p')
  paletteArray = localStorage.palette ? JSON.parse(localStorage.palette) : []
  _this =
    checkQuantity: (qty) ->
      dropText.hide();
      if paletteArray.length is qty then dropText.show()
    save: ->
      localStorage.palette = JSON.stringify(paletteArray)
    restore: ->
      if localStorage.palette
        paletteColors = JSON.parse(localStorage.palette)
      
      for color in paletteColors
        configs.palette.selector.append colors.markup(color)
      
      _this.checkQuantity(0)

    init: ->
      _this.restore()
      
      configs.colors.placeholder.find('.color').on 'dragstart', (e) ->
        tooltip.dismiss()
        e.originalEvent.dataTransfer.effectAllowed = 'copy'
        e.originalEvent.dataTransfer.setData('Text', $(this).attr('data-hex'))
        
        configs.palette.dropzone.on 'dragover', (e) ->
          e.originalEvent.dataTransfer.dropEffect = if paletteArray.length <= (configs.palette.limit-1) then 'copy' else 'none'
          return false
        
        configs.palette.dropzone.on 'drop', (e) ->
          configs.palette.dropzone.off()
          color = e.originalEvent.dataTransfer.getData('Text')
          
          if paletteArray.length <= (configs.palette.limit-1)
            configs.palette.selector.append colors.markup(color)
            
            _this.checkQuantity(-1)
          
            paletteArray.push(color)
            _this.save()
        
            formats.init('#palette > .color')

          return false
      
      configs.palette.selector.on 'dragstart', '.color', (e) ->
        configs.palette.dropzone.off()
        e.originalEvent.dataTransfer.effectAllowed = 'move'
        e.originalEvent.dataTransfer.setData('Text', $(this).index())
        configs.palette.trash.show()

      configs.palette.selector.on 'dragend', (e) ->
        configs.palette.trash.hide()
      
      configs.palette.trash.on 'dragover', (e) ->
        e.originalEvent.dataTransfer.dropEffect = 'move'
        return false

      configs.palette.trash.on 'drop', (e) ->
        index = +e.originalEvent.dataTransfer.getData('Text')
        paletteArray.splice(index-1, 1)
        _this.checkQuantity(0)
        _this.save()
        configs.palette.selector.find('.color').eq(index-1).remove()
        $(this).hide()
        return false
  
  return _this