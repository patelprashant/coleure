(function() {

  define(['./keyboard', './settings', './goodies'], function(keyboard, settings, _) {
    var selectColor;
    selectColor = function(color) {
      var clipboardHandler;
      clipboardHandler = _.id('clipboard_handler');
      clipboardHandler.value = color.getAttribute('data-' + settings.format);
      return clipboardHandler.select();
    };
    _.listen(_.id('colors'), 'mouseover', function(event) {
      return selectColor(event.target);
    });
    _.listen(_.id('subjects'), 'mouseover', function(event) {
      return selectColor(event.target);
    });
    return keyboard.listenWithCtrl('C', function() {
      var clipboard;
      clipboard = _.id('clipboard_handler').value;
      return document.title = "" + clipboard + " - Coleure";
    });
  });

}).call(this);
