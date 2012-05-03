(function() {

  define(['./keyboard', './settings', './goodies'], function(keyboard, settings, _) {
    _.listen(_.id('colors'), 'mouseover', function(event) {
      var clipboardHandler;
      clipboardHandler = _.id('clipboard_handler');
      clipboardHandler.value = event.target.getAttribute('data-' + settings.format);
      return clipboardHandler.select();
    });
    return keyboard.listenWithCtrl('C', function() {
      var clipboard;
      clipboard = _.id('clipboard_handler').value;
      return document.title = "" + clipboard + " - Coleure";
    });
  });

}).call(this);
