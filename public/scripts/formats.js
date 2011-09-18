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
    switch(format){
      case 0:
        switch(output){
          case 0:
            return 'with #'
            break;
          case 1:
            return 'without #'
            break;
          case 2:
            return 'with 0x'
            break;
        }
        break;
      case 1:
        switch(output){
          case 0:
            return 'in rgba()'
            break;
          case 1:
            return 'in rgb()'
            break;
          case 2:
            return 'in commas'
            break;
        }
        break;
      case 2:
        switch(output){
          case 0:
            return 'in hsla()'
            break;
          case 1:
            return 'in hsl()'
            break;
          case 2:
            return 'in commas'
            break;
        }
        break;
    }
  }
  $('#output').text(output_text(parseInt(current_format), parseInt(current_output[current_format])))

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
    $('#output').text(output_text(current_format, current_output[current_format]))
  }

  function rotates_output() {
    ++current_output[current_format];
    if (current_output[current_format] == outputs[current_format].length)
      current_output[current_format] = 0;

    $('.color_value').text(returns_output)
    localStorage['color_output'] = JSON.stringify(current_output)
    $('#output').text(output_text(current_format, current_output[current_format]))
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