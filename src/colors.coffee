define ['./configs','./pantone'], (configs, pantone) ->
  markup: (color, name) ->
    return '<section draggable="true" class="item #{configs.colors.dom}" style="background: ##{color}">#{color}</section>'

  init: ->
    for own i, color of pantone.colors
      if color
        configs.colors.placeholder.append this.markup(color, pantone.names[i])
      else
        configs.colors.placeholder.append('<div class="item empty-color" />')