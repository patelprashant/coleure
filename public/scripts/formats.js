$(function(){
  var current_format = localStorage['color_format']? 
                         localStorage['color_format']: 0,
      current_output = localStorage['color_output']?
                         JSON.parse(localStorage['color_output']): [0, 0, 0];

  var formats = ["hex", "rgb", "hsl"],
      outputs =[['#', '', '0x'],
                ['rgba', 'rgb', ''],
                ['hsla', 'hsl', '']];
  
  $('#'+formats[current_format]).addClass('current')
  
  function output_text(format, output) {
    return format == 0 ?  output == 0 ? 'with #' :
                          output == 1 ? 'without #' :
                          output == 2 ? 'with 0x' : null :

           format == 1 ?  output == 0 ? 'in rgba()' :
                          output == 1 ? 'in rgb()' :
                          output == 2 ? 'in commas' : null :

           format == 2 ?  output == 0 ? 'in hsla()' :
                          output == 1 ? 'in hsl()' :
                          output == 2 ? 'in commas' : null;
  }
  
  function sets_output_text () {
    $('#output').text(output_text(parseInt(current_format), parseInt(current_output[current_format])))
  }
  sets_output_text();

  function returns_output() {
    var format = formats[current_format];
    var output = outputs[current_format][current_output[current_format]];
    var color  = $(this).attr('data-'+format);
    
    if (format == 'hex') {
      return output + color;
    } else {
      return current_output[current_format] != 2 ?
              output + '(' + 
                color + (current_output[current_format] == 0 ? ', 1' : '') + 
                       ')':
              color;
    }
  };

  function rotates_format() {
    ++current_format;
    if (current_format == formats.length)
      current_format = 0;

    $('.color_value').text(returns_output)

    localStorage['color_format'] = current_format
    $('#hex, #rgb, #hsl').removeClass('current')
    $('#'+formats[current_format]).addClass('current')
    sets_output_text();
  }

  function rotates_output() {
    ++current_output[current_format];
    if (current_output[current_format] == outputs[current_format].length)
      current_output[current_format] = 0;

    $('.color_value').text(returns_output)
    localStorage['color_output'] = JSON.stringify(current_output)
    sets_output_text();
  }

  $('.color_value').text(returns_output)

  $('#rotates_format').click(function() {rotates_format();})
  $('#rotates_output').click(function() {rotates_output();})
  
  $(document).keydown(function(e){
    var pressed_key = String.fromCharCode(e.which)
    switch(pressed_key){
      // Switches between outputs for each format
      case 'T':
        rotates_output();
        break;
      
      // Switches the format between HEX/RGB/HSL
      case 'F':
        rotates_format();
        break;
    }
  });
});