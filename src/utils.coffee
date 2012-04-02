define ['./configs','./keyboard'], (configs, keyboard) ->
    # Colors
    r: (hex) ->
      return parseInt (hex).substring(0,2), 16
    g: (hex) ->
      return parseInt (hex).substring(2,4), 16
    b: (hex) ->
      return parseInt (hex).substring(4,6), 16
    rgb: (hex) ->
      return this.r(hex)+', '+this.g(hex) +', '+this.b(hex)
    hsl: (r, g, b) ->
      r /= 255
      g /= 255
      b /= 255

      max = Math.max(r, g, b)
      min = Math.min(r, g, b)
      h = s = l = (max + min) / 2

      if max is min
        h = s = 0 # achromatic
      else
        d = max - min
        s = if l > 0.5 then d / (2 - max - min) else d / (max + min)
        switch max
          when r then h = (g - b) / d + (g < b ? 6 : 0)
          when g then h = (b - r) / d + 2
          when b then h = (r - g) / d + 4
        h /= 6

      [Math.floor(h * 360)+', '+Math.floor(s * 100)+'%, '+Math.floor(l * 100)+'%']
  
    # Metakeys
    metakey: (selector) ->
      ua = navigator.userAgent.toLowerCase()
      if ua.indexOf('mac') isnt -1
        selector.text('⌘')
      else
        selector.text('Ctrl+')