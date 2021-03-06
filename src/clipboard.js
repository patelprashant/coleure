(function() {

  define(['./keyboard', './settings', './inspector', './goodies'], function(keyboard, settings, i, _) {
    var canvas, clipboard_handler, format_status, colorTip, colors_class, ctx, currentColor, hoverColor, verifyIfColor;
    colors_class = 'color';
    clipboard_handler = _.id('clipboard_handler');
    format_status = _.id('format_status');
    colorTip = _.id('color-tip');
    hoverColor = function(color) {
      _.attr(clipboard_handler, 'data-name', _.attr(color, 'data-name'));
      _.attr(clipboard_handler, 'data-hex', _.attr(color, 'data-hex'));
      _.attr(clipboard_handler, 'data-rgb', _.attr(color, 'data-rgb'));
      _.attr(clipboard_handler, 'data-hsl', _.attr(color, 'data-hsl'));
      clipboard_handler.value = format_status.innerHTML = colorTip.innerHTML = _.attr(color, "data-" + settings.format);
      format_status.style.backgroundColor = '#'+_.attr(color, "data-hex");
      Color('#'+_.attr(color, "data-hex")).light() ? format_status.style.color = "#232323" :format_status.style.color = "#fff";
      return clipboard_handler.select();
    };
    currentColor = '';
    verifyIfColor = function(event) {
      if (event.target.classList.contains(colors_class)) {
        currentColor = event;
        return hoverColor(currentColor.target);
      }
    };
    _.listen(_.id('colors'), 'mouseover', verifyIfColor);
    _.listen(_.id('panels'), 'mouseover', verifyIfColor);
    _.listen(_.id('palette'), 'mouseover', verifyIfColor);

    canvas = document.createElement('canvas');
    canvas.height = canvas.width = 32;
    ctx = canvas.getContext('2d');
    return keyboard.listenWithCtrl('C', function() {
      var clipboard, head, link, oldLink;
      clipboard = clipboard_handler.value;
      if (!clipboard) {
        return;
      }
      document.title = "" + clipboard + " - Coleure";
      ctx.clearRect(0, 0, 32, 32);
      ctx.fillStyle = "#" + _.attr(clipboard_handler, 'data-hex');
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      link = document.createElement('link');
      link.id = 'dynamic-favicon';
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL('image/x-icon');
      oldLink = _.id('dynamic-favicon');
      head = document.head || _.tag('head')[0];
      if (oldLink) {
        head.removeChild(oldLink);
      }
      return head.appendChild(link);
    });
  });

}).call(this);
