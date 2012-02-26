var current_format = localStorage['color_format']? 
                     localStorage['color_format']: 0,
    current_output = localStorage['color_output']?
                     JSON.parse(localStorage['color_output']): [0, 0, 0];

var formats = ["hex", "rgb", "hsl"],
    outputs =[['#', '', '0x'],
              ['rgba', 'rgb', ''],
              ['hsla', 'hsl', '']];
            
function output_text(format, output) {
  return format == 0 ?  output == 0 ? 'with #'    :
                        output == 1 ? 'without #' :
                        output == 2 ? 'with 0x'   : null :

         format == 1 ?  output == 0 ? 'with rgba()' :
                        output == 1 ? 'with rgb()'  :
                        output == 2 ? 'with commas' : null :

         format == 2 ?  output == 0 ? 'with hsla()' :
                        output == 1 ? 'with hsl()'  :
                        output == 2 ? 'with commas' : null : null;
};
  
function returnOutput() {
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
  };
};
  
function refreshFormat() {
  $('#output').text(output_text(parseInt(current_format), parseInt(current_output[current_format])));
  $('#'+formats[current_format]).addClass('current');
};
refreshFormat();

function assignOutputs() {
  $('.'+colorValue).text(returnOutput);
};
            
function rotateFormat() {
  ++current_format;
  if (current_format == formats.length)
    current_format = 0;

  localStorage['color_format'] = current_format;
  assignOutputs();

  $('#hex, #rgb, #hsl').removeClass('current');
  refreshFormat();
};

function rotateOutput() {
  ++current_output[current_format];
  if (current_output[current_format] == outputs[current_format].length)
    current_output[current_format] = 0;

  assignOutputs();
  
  localStorage['color_output'] = JSON.stringify(current_output);
  refreshFormat();
};
addOption({name:'Format', shortcut:'F', run: rotateFormat});
addOption({name:'Output', shortcut:'D', run: rotateOutput});
                
$(function(){
  assignOutputs();
});