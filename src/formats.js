(function() {

  define(['./settings', './goodies'], function(settings, _) {
    var clipboard_handler, formats, switchFormat,
      _this = this;
    formats = _.cls('set-format');
    clipboard_handler = _.id('clipboard_handler');
    switchFormat = function(event) {
      var newFormat;
      newFormat = event.target;
      settings.format = newFormat.getAttribute('id');
      _.forEach(formats, function(element) {
        return element.setAttribute('data-state', 'inactive');
      });
      newFormat.setAttribute('data-state', 'active');
      clipboard_handler.value = clipboard_handler.getAttribute('data-' + settings.format);
      return clipboard_handler.select();
    };
    return _.forEach(formats, function(element) {
      return _.listen(element, 'click', switchFormat);
    });
  });

}).call(this);
