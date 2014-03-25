(function() {

  define(['./settings', './goodies'], function(settings, _) {
    var clipboardHandler, formatStatus, colorTip, formats, switchFormat;
    formats = _.cls('set-format');
    clipboardHandler = _.id('clipboard_handler');
    formatStatus = _.id('format_status');
    colorTip = _.id('color-tip');
    _.attr(_.id(settings.format), 'data-state', 'active');
    switchFormat = function(event) {
      var newFormat;
      newFormat = event.target;
      settings.format = _.attr(newFormat, 'id');
      _.forEach(formats, function(element) {
        return _.attr(element, 'data-state', 'inactive');
      });
      _.attr(newFormat, 'data-state', 'active');
      clipboardHandler.value = formatStatus.innerHTML = colorTip.innerHTML = _.attr(clipboardHandler, "data-" + settings.format);
      return clipboardHandler.select();
    };
    return _.forEach(formats, function(element) {
      return _.listen(element, 'click', switchFormat);
    });
  });

}).call(this);
