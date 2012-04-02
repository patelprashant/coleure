define ['./configs', './utils', './keyboard'], (configs, utils, keyboard) ->
  current_format = localStorage['color_format'] or 0
  current_output = if localStorage['color_output'] then JSON.parse(localStorage['color_output']) else [0, 0, 0]
  formats = ["hex", "rgb", "hsl"]
  outputs = [['', '#', '0x'],
             ['rgba', 'rgb', ''],
             ['hsla', 'hsl', '']]
            
  output_text = (format, output) ->
    switch format
      when 0
        switch output
          when 0 then 'without #'
          when 1 then 'with #'
          when 2 then 'with 0x'
      when 1
        switch output
          when 0 then 'with rgba()'
          when 1 then 'with rgb()' 
          when 2 then 'with commas'
      when 2
        switch output
          when 0 then 'with hsla()'
          when 1 then 'with hsl()'
          when 2 then 'with commas'
    
  returnOutput = ->
    format = formats[current_format]
    output = outputs[current_format][current_output[current_format]]
    color  = $(this).attr('data-'+format)
    
    if format is 'hex'
      output + color
    else
      if current_output[current_format] isnt 2
        output + '(' + color + (if current_output[current_format] is 0 then ', 1' else '') + ')'
      else
        color
    
  refreshFormat = ->
    $('#output').text(output_text(+current_format, +current_output[current_format]))
    $('#'+formats[current_format]).addClass('current')

  refreshFormat()

  assignOutputs = -> $('.color').text(returnOutput)
              
  rotateFormat = ->
    ++current_format
    if current_format is formats.length
      current_format = 0

    localStorage['color_format'] = current_format
    assignOutputs()

    $('#hex, #rgb, #hsl').removeClass('current')
    refreshFormat()

  rotateOutput = ->
    ++current_output[current_format]
    if current_output[current_format] is outputs[current_format].length
      current_output[current_format] = 0

    assignOutputs()
    
    localStorage['color_output'] = JSON.stringify(current_output)
    refreshFormat()

    init: (target) ->
      $(target).each(->
        self = $(this)
        hex = self.text()
        self.attr('data-hex', hex)
        self.attr('data-rgb', utils.rgb(hex))
        self.attr('data-hsl', utils.hsl(utils.r(hex),utils.g(hex),utils.b(hex)))

      assignOutputs()
      keyboard.single('F', rotateFormat)
      keyboard.single('D', rotateOutput)