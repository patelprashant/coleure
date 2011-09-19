<<<<<<< HEAD
$(function(){function i(){++b[a];if(b[a]==d[a].length)b[a]=0;$(".color_value").text(g);localStorage["color_output"]=JSON.stringify(b);f()}function h(){++a;if(a==c.length)a=0;$(".color_value").text(g);localStorage["color_format"]=a;$("#hex, #rgb, #hsl").removeClass("current");$("#"+c[a]).addClass("current");f()}function g(){var e=c[a];var f=d[a][b[a]];var g=$(this).attr("data-"+e);if(e=="hex"){return f+g}else{return b[a]!=2?f+"("+g+(b[a]==0?", 1":"")+")":g}}function f(){$("#output").text(e(parseInt(a),parseInt(b[a])))}function e(a,b){return a==0?b==0?"with #":b==1?"without #":b==2?"with 0x":null:a==1?b==0?"in rgba()":b==1?"in rgb()":b==2?"in commas":null:a==2?b==0?"in hsla()":b==1?"in hsl()":b==2?"in commas":null:null}var a=localStorage["color_format"]?localStorage["color_format"]:0,b=localStorage["color_output"]?JSON.parse(localStorage["color_output"]):[0,0,0];var c=["hex","rgb","hsl"],d=[["#","","0x"],["rgba","rgb",""],["hsla","hsl",""]];$("#"+c[a]).addClass("current");f();$(".color_value").text(g);$("#rotates_format").click(function(){h()});$("#rotates_output").click(function(){i()});$(document).keydown(function(a){var b=String.fromCharCode(a.which);switch(b){case"T":i();break;case"F":h();break}})})
=======
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
>>>>>>> parent of b896676... Switch case killed.
