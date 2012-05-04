(function() {

  define(['./keyboard', './settings', './goodies'], function(keyboard, settings, _) {
    var clipboard_handler, colors_class, selectColor;
    colors_class = 'color';
    clipboard_handler = _.id('clipboard_handler');
    selectColor = function(color) {
      clipboard_handler.value = color.getAttribute('data-' + settings.format);
      return clipboard_handler.select();
    };
    _.listen(_.id('colors'), 'mouseover', function(event) {
      if (event.target.classList.contains(colors_class)) {
        return selectColor(event.target);
      }
    });
    _.listen(_.id('subjects'), 'mouseover', function(event) {
      if (event.target.classList.contains(colors_class)) {
        return selectColor(event.target);
      }
    });
    return keyboard.listenWithCtrl('C', function() {
      var clipboard;
      clipboard = clipboard_handler.value;
      return document.title = "" + clipboard + " - Coleure";
    });
  });

}).call(this);
