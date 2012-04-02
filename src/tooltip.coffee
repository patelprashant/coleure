define ['./configs', './keyboard'], (configs, keyboard) ->
    done = localStorage.tooltip? localStorage.tooltip:"false";
    _this =
      notify: (message) ->
       configs.tooltip.text(message)
      dismiss: ->
        configs.tooltip.fadeOut('fast')
        done = 'true'
        localStorage.tooltip = 'true'
       success: ->
        _this.notify('You got it! Now paste it.')
        configs.tooltip.addClass('success')
        setTimeout((-> _this.dismiss()), 1000)
       init: ->
        if done is 'true' then configs.tooltip.hide()
          $('.empty-color, .site, .banner').bind('mouseover mousemove', ->
            configs.tooltip.fadeOut('fast')
          $('.color').bind('mouseover mousemove', (e) ->
            if done is 'false' then configs.tooltip.fadeIn()
            configs.tooltip.css
              'top': e.clientY
              'left': e.clientX
         
          keyboard.combined('C', _this.success)