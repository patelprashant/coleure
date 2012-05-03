(function() {

  define(['./settings', './goodies'], function(settings, _) {
    var formats, switchFormat,
      _this = this;
    formats = _.cls('set-format');
    switchFormat = function(event) {
      var newFormat;
      newFormat = event.target;
      settings.format = newFormat.getAttribute('id');
      _.forEach(formats, function(element) {
        return element.setAttribute('data-state', 'inactive');
      });
      return newFormat.setAttribute('data-state', 'active');
    };
    return _.forEach(formats, function(element) {
      return _.listen(element, 'click', switchFormat);
    });
  });

}).call(this);
