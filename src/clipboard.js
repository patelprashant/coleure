(function() {

  define(['./keyboard', './settings', './goodies'], function(keyboard, settings, _) {
    var canvas, clipboard_handler, colors_class, ctx, hoverColor, verifyIfColor;
    colors_class = 'color';
    clipboard_handler = _.id('clipboard_handler');
    hoverColor = function(color) {
      _.attr(clipboard_handler, 'data-hex', _.attr(color, 'data-hex'));
      _.attr(clipboard_handler, 'data-rgb', _.attr(color, 'data-rgb'));
      _.attr(clipboard_handler, 'data-hsl', _.attr(color, 'data-hsl'));
      clipboard_handler.value = _.attr(color, "data-" + settings.format);
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
      var clipboard, head, link, oldLink;
      clipboard = clipboard_handler.value;
      if (!clipboard) return;
      document.title = "" + clipboard + " - Coleure";
      ctx.clearRect(0, 0, 16, 16);
      ctx.fillStyle = "#" + _.attr(clipboard_handler, 'data-hex');
      ctx.beginPath();
      ctx.arc(8, 8, 8, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      link = document.createElement('link');
      link.id = 'dynamic-favicon';
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL('image/x-icon');
      oldLink = _.id('dynamic-favicon');
      head = document.head || _.tag('head')[0];
      if (oldLink) head.removeChild(oldLink);
      return head.appendChild(link);
    });
  });

}).call(this);
