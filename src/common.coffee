$body = $('body')
$scroller = $('div#scroller')
$colors = $('.color')
$clip_handler = $('#clipboard_handler')
$options = $('ul#options')

// Grabs the current color value and prepends it 
// to an input that will auto select.
////////////////////////////////////////////////
selectColor = ->
  color_value_text = $('.value', this).text()
  $clip_handler.val(color_value_text).select()
  $('.current-color').text $clip_handler.val()
  
addOption = (option) ->
  if option.name
    $options.append
      '<li class="option">' +
        (option.shortcut? '<kbd>#{option.shortcut}</kbd>':'') +
        '<a href="javascript:;" onClick="#{option.run.name}();">#{option.name}</a>
      </li>'
  
  if option.shortcut
    $(document).keydown((e) ->
      pressedKey = String.fromCharCode(e.which)
      switch pressedKey
        when option.shortcut then option.run()

// Prepends the 
currentColorToTitle = ->
  $('title').text('Copied: #{$clip_handler.val()} — Coleure')

$(->
  
  // Changes the color and selects the 
  // color in the hidden input.
  ////////////////////////////////////
  $colors.live("mouseover", selectColor)
  
  // Saves the current scroll state
  /////////////////////////////////
  $scroller.scroll(-> localStorage['scrolled'] = $(this).scrollTop())
  $scroller.scrollTop(+localStorage['scrolled'])

$(document).keydown((e) ->
  pressedKey = String.fromCharCode(e.which)
  
  // Notifies the user that the color has been copied
  ///////////////////////////////////////////////////
  if e.metaKey or e.ctrlKey
    if pressedKey is 'C' then currentColorToTitle()