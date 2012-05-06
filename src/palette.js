(function() {

  define(['./goodies'], function(_) {
    return {
      setup: function(options) {
        var _this = this;
        return _.listen(_.id('colors'), 'dragstart', function(event) {
          return _this.setDropzone(event, options);
        });
      },
      setDropzone: function(event, options) {
        var cache, color, colors, data, dropzone,
          _this = this;
        color = event.target;
        dropzone = _.id('palette');
        colors = _.id('palette_colors');
        cache = colors.innerHTML;
        data = {
          name: _.attr(color, 'data-name'),
          hex: _.attr(color, 'data-hex'),
          rgb: _.attr(color, 'data-rgb'),
          hsl: _.attr(color, 'data-hsl')
        };
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.setData('text', 'Color added.');
        _.listen(dropzone, 'dragover', function(event) {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
          return false;
        });
        return _.listen(dropzone, 'drop', function(event) {
          _.template(options.template, function(template) {
            return colors.innerHTML = (template(data)) + cache;
          });
          return _.hide(_.id('drop-message'));
        });
      }
    };
  });

}).call(this);
