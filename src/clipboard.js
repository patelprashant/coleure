(function() {

  define(['./keyboard', './settings', './goodies'], function(keyboard, settings, _) {
    var clipboard_handler, colors_class, hoverColor;
    colors_class = 'color';
    clipboard_handler = _.id('clipboard_handler');
    hoverColor = function(color) {
      clipboard_handler.setAttribute('data-hex', color.getAttribute('data-hex'));
      clipboard_handler.setAttribute('data-rgb', color.getAttribute('data-rgb'));
      clipboard_handler.setAttribute('data-hsl', color.getAttribute('data-hsl'));
      clipboard_handler.value = color.getAttribute('data-' + settings.format);
      return clipboard_handler.select();
    };
    _.listen(_.id('colors'), 'mouseover', function(event) {
      if (event.target.classList.contains(colors_class)) {
        return hoverColor(event.target);
      }
    });
    _.listen(_.id('subjects'), 'mouseover', function(event) {
      if (event.target.classList.contains(colors_class)) {
        return hoverColor(event.target);
      }
    });
    return keyboard.listenWithCtrl('C', function() {
      var canvas, clipboard, ctx, link;
      clipboard = clipboard_handler.value;
      document.title = "" + clipboard + " - Coleure";
      link = _.cls('favicon')[0].cloneNode(true);
      canvas = document.createElement("canvas");
      canvas.height = canvas.width = 16;
      ctx = canvas.getContext("2d");
      ctx.fillStyle = "#" + clipboard_handler.getAttribute('data-hex');
      ctx.beginPath();
      ctx.arc(8, 8, 8, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      link.href = canvas.toDataURL("image/png");
      return document.head.appendChild(link);
    });
  });

}).call(this);
