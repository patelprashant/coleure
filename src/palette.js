(function() {

  define(['./goodies'], function(_) {
    return {
      setup: function(options) {
        var colorDrag, colors, data, dropzone;
        dropzone = _.id('palette');
        colors = _.id('palette_colors');
        data = null;
        colorDrag = function(event) {
          var color;
          color = event.target;
          data = {
            name: _.attr(color, 'data-name'),
            hex: _.attr(color, 'data-hex'),
            rgb: _.attr(color, 'data-rgb'),
            hsl: _.attr(color, 'data-hsl')
          };
          event.dataTransfer.effectAllowed = 'copy';
          return event.dataTransfer.setData('text', 'Color added.');
        };
        _.listen(_.id('colors'), 'dragstart', colorDrag);
        _.listen(_.id('subjects'), 'dragstart', colorDrag);
        _.listen(dropzone, 'dragover', function(event) {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
          return false;
        });
        return _.listen(dropzone, 'drop', function(event) {
          _.template(options.template, function(template) {
            var el;
            el = document.createElement('i');
            colors.insertBefore(el, colors.firstChild);
            return el.outerHTML = template(data);
          });
          return _.hide(_.id('drop-message'));
        });
      }
    };
  });

}).call(this);
