(function() {

  define(['./keyboard', './settings', './goodies'], function(keyboard, settings, _) {
    var canvas, clipboard_handler, colors_class, ctx, hoverColor, verifyIfColor;
    colors_class = 'color';
    clipboard_handler = _.id('clipboard_handler');
    hoverColor = function(color) {
      clipboard_handler.setAttribute('data-hex', color.getAttribute('data-hex'));
      clipboard_handler.setAttribute('data-rgb', color.getAttribute('data-rgb'));
      clipboard_handler.setAttribute('data-hsl', color.getAttribute('data-hsl'));
      clipboard_handler.value = color.getAttribute("data-" + settings.format);
      return clipboard_handler.select();
    };
    verifyIfColor = function(event) {
      if (event.target.classList.contains(colors_class)) {
        return hoverColor(event.target);
      }
    };
    _.listen(_.id('colors'), 'mouseover', verifyIfColor);
    _.listen(_.id('subjects'), 'mouseover', verifyIfColor);
    canvas = document.createElement('canvas');
    canvas.height = canvas.width = 16;
    ctx = canvas.getContext('2d');
    return keyboard.listenWithCtrl('C', function() {
      var clipboard;
      clipboard = clipboard_handler.value;
      if (!clipboard) return;
      document.title = "" + clipboard + " - Coleure";
      ctx.clearRect(0, 0, 16, 16);
      ctx.fillStyle = "#" + clipboard_handler.getAttribute('data-hex');
      ctx.beginPath();
      ctx.arc(8, 8, 8, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      return _.id('dynamic-favicon').href = canvas.toDataURL('image/png');
    });
  });

}).call(this);
