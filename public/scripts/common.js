$(function(){function n(){localStorage.removeItem("palette");m=[];$("#chosen_colors .color").remove()}function l(){localStorage["palette_hidden"]=="true"?j():k();localStorage["palette_hidden"]=!(localStorage["palette_hidden"]=="true")}function k(){if($(window).width()>=1400){a.removeClass("palette-shown")}else{$(".scroller").scrollTop($(".scroller").scrollTop()-b.innerHeight());$(".scroller").css("top",0)}b.hide()}function j(){if($(window).width()>=1400){a.addClass("palette-shown")}else{$(".scroller").scrollTop($(".scroller").scrollTop()+b.innerHeight());$(".scroller").css("top",b.innerHeight())}b.show()}function i(){m.splice($(this).index(),1);$(this).remove();localStorage["palette"]=JSON.stringify(m)}function h(){var a=$(".color_value",this),b=a.text();e.val(b).select();$(".ins_code").text(e.val())}function f(){var a=$(".color_value");localStorage["hidden_values"]=="true"?a.hide():a.show();localStorage["hidden_values"]=!(localStorage["hidden_values"]=="true")}var a=$("body"),b=$("#colors_palette"),c=$(".color"),d=$("div#scroller"),e=$("#clipboard_handler");if(localStorage["palette_hidden"]){localStorage["palette_hidden"]=="false"?j():k()}else{localStorage.setItem("palette_hidden",true);k()}var g=$(".color_value");g.hide();if(localStorage["hidden_values"]=="true")g.show();$("#toggle_values").click(function(){f()});c.hover(h);$("#chosen_colors .color").click(i);var m=localStorage["palette"]?JSON.parse(localStorage["palette"]):[];$("#scroller .color").click(function(a){var b=$(".color_value",this).attr("data-hex");$(this).clone().prependTo("#chosen_colors").hover(h).click(i);m.unshift(b);localStorage["palette"]=JSON.stringify(m);if(localStorage["palette_hidden"]=="true")j();localStorage["palette_hidden"]=false});$("#show_palette").click(function(){l()});$("#clear_palette").click(function(){n()});$(document).keydown(function(a){var b=String.fromCharCode(a.which);switch(b){case"H":f();break;case"E":l();break}if(a.metaKey||a.ctrlKey){if(b=="C")$("title").text("Last copied: "+e.val()+" — Coleure")}});$(".scroller").scroll(function(){localStorage.setItem("scrolled",$(this).scrollTop())});$(".scroller").scrollTop(parseInt(localStorage["scrolled"]))})